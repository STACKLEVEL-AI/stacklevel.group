const { createHmac, timingSafeEqual } = require("node:crypto");
const http = require("node:http");

const rawPort = process.env.PORT;
const PORT = Number(rawPort);

if (!rawPort || Number.isNaN(PORT) || PORT <= 0) {
  throw new Error("PORT is not configured.");
}

function nowIso() {
  return new Date().toISOString();
}

function json(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

function cut(value, max) {
  return String(value ?? "").normalize("NFKC").trim().slice(0, max);
}

function parseList(value) {
  return String(value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function hmacHex(secret, body, timestamp) {
  return createHmac("sha256", secret).update(`${body}.${timestamp}`).digest("hex");
}

function safeHexEqual(a, b) {
  const aBuf = Buffer.from(String(a), "hex");
  const bBuf = Buffer.from(String(b), "hex");
  if (aBuf.length === 0 || bBuf.length === 0 || aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
}

function shouldRetry(status) {
  return status === 429 || status >= 500;
}

function isSkippableRecipientStatus(status) {
  // Telegram returns 400/403 for chats where bot is not started, blocked, or chat_id is invalid.
  return status === 400 || status === 403;
}

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

async function verifyRecaptchaToken(secret, token, ip) {
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    return false;
  }

  const result = await response.json();
  return Boolean(result.success);
}

async function sendMessageWithRetry(botToken, chatId, text) {
  const attempts = 3;
  let lastStatus = 500;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          protect_content: true,
          disable_web_page_preview: true,
          link_preview_options: { is_disabled: true },
        }),
      });

      if (response.ok) {
        return { ok: true, status: 200 };
      }

      lastStatus = response.status;
      if (!shouldRetry(response.status) || attempt === attempts) {
        return { ok: false, status: response.status };
      }
    } catch {
      lastStatus = 503;
      if (attempt === attempts) {
        return { ok: false, status: 503 };
      }
    }

    await sleep(attempt * 400);
  }

  return { ok: false, status: lastStatus };
}

function buildMessage({ name, workEmail, company, topic, message }) {
  return [
    "New contact request",
    "",
    `Name: ${name}`,
    `Work email: ${workEmail}`,
    `Company: ${company}`,
    `Topic: ${topic}`,
    "",
    "Message:",
    message,
  ].join("\n");
}

function cleanupIdempotency(cache) {
  const now = Date.now();
  for (const [key, expiresAt] of cache.entries()) {
    if (expiresAt <= now) {
      cache.delete(key);
    }
  }
}

async function deleteWebhookOnStart(botToken) {
  const response = await fetch(`https://api.telegram.org/bot${botToken}/deleteWebhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ drop_pending_updates: true }),
  });
  if (!response.ok) {
    throw new Error(`deleteWebhook failed with status ${response.status}`);
  }
}

async function bootstrap() {
  const recaptchaSecret = cut(process.env.RECAPTCHA_SECRET_KEY, 4096);
  const botToken = cut(process.env.TELEGRAM_BOT_TOKEN, 4096);
  const hmacSecret = cut(process.env.INTERNAL_HMAC_SECRET, 4096);
  const recipients = parseList(process.env.RECIPIENT_USER_IDS || process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID);

  if (!recaptchaSecret) throw new Error("recaptcha secret is empty");
  if (!botToken) throw new Error("telegram bot token is empty");
  if (!hmacSecret) throw new Error("internal hmac secret is empty");
  if (recipients.length === 0) throw new Error("RECIPIENT_USER_IDS is empty");

  await deleteWebhookOnStart(botToken);

  const replayWindowSeconds = Number(process.env.HMAC_REPLAY_WINDOW_SECONDS || 60);
  const idemTtlMs = Number(process.env.IDEMPOTENCY_TTL_MS || 300_000);
  const idempotencyCache = new Map();

  const server = http.createServer(async (req, res) => {
    const requestId = req.headers["x-request-id"] || "unknown";
    const ip = req.socket.remoteAddress || "unknown";

    if (req.method === "GET" && req.url === "/healthz") {
      return json(res, 200, { ok: true });
    }

    if (req.method !== "POST" || req.url !== "/internal/send") {
      return json(res, 404, { error: "Not found." });
    }

    const timestampHeader = cut(req.headers["x-timestamp"], 64);
    const signatureHeader = cut(req.headers["x-signature"], 256);
    const idempotencyKey = cut(req.headers["x-idempotency-key"], 200);

    if (!timestampHeader || !signatureHeader || !idempotencyKey) {
      return json(res, 401, { error: "Missing auth headers.", error_code: "missing_headers" });
    }

    const timestamp = Number(timestampHeader);
    if (!Number.isFinite(timestamp)) {
      return json(res, 401, { error: "Invalid timestamp.", error_code: "invalid_timestamp" });
    }

    const now = Math.floor(Date.now() / 1000);
    if (Math.abs(now - timestamp) > replayWindowSeconds) {
      return json(res, 401, { error: "Timestamp outside allowed window.", error_code: "timestamp_window" });
    }

    cleanupIdempotency(idempotencyCache);
    if (idempotencyCache.has(idempotencyKey)) {
      return json(res, 409, { error: "Duplicate idempotency key.", error_code: "idempotency_replay" });
    }

    let body = "";
    for await (const chunk of req) {
      body += chunk;
    }

    const expectedSignature = hmacHex(hmacSecret, body, timestampHeader);
    if (!safeHexEqual(signatureHeader, expectedSignature)) {
      return json(res, 401, { error: "Invalid signature.", error_code: "invalid_signature" });
    }

    let payload;
    try {
      payload = JSON.parse(body);
    } catch {
      return json(res, 400, { error: "Invalid JSON body.", error_code: "invalid_json" });
    }

    const name = cut(payload.name, 120);
    const workEmail = cut(payload.workEmail, 160);
    const company = cut(payload.company, 160);
    const topic = cut(payload.topic, 160);
    const message = cut(payload.message, 4000);
    const captchaToken = cut(payload.captchaToken, 4096);
    const website = cut(payload.website, 256);
    const clientIp = cut(payload.ip, 120);

    if (website || !name || !workEmail || !company || !topic || !message || !captchaToken) {
      return json(res, 400, { error: "Invalid payload.", error_code: "invalid_payload" });
    }

    const captchaOk = await verifyRecaptchaToken(recaptchaSecret, captchaToken, clientIp || null);
    if (!captchaOk) {
      return json(res, 400, { error: "Captcha verification failed.", error_code: "captcha_failed" });
    }

    const text = buildMessage({ name, workEmail, company, topic, message });
    let deliveredCount = 0;
    let skippedCount = 0;
    let failedCount = 0;

    for (const recipient of recipients) {
      const result = await sendMessageWithRetry(botToken, recipient, text);
      if (result.ok) {
        deliveredCount += 1;
        continue;
      }

      if (isSkippableRecipientStatus(result.status)) {
        skippedCount += 1;
        console.warn(
          JSON.stringify({
            timestamp: nowIso(),
            outcome: "warn",
            error_code: "telegram_recipient_skipped",
            request_id: requestId,
            ip,
            recipient,
            status: result.status,
          }),
        );
        continue;
      }

      failedCount += 1;
      console.error(
        JSON.stringify({
          timestamp: nowIso(),
          outcome: "error",
          error_code: "telegram_send_failed",
          request_id: requestId,
          ip,
          recipient,
          status: result.status,
        }),
      );
    }

    if (deliveredCount === 0) {
      if (skippedCount > 0 && failedCount === 0) {
        console.error(
          JSON.stringify({
            timestamp: nowIso(),
            outcome: "error",
            error_code: "no_authorized_recipients",
            request_id: requestId,
            ip,
            skipped_count: skippedCount,
          }),
        );
        return json(res, 502, {
          error: "No authorized Telegram recipients available.",
          error_code: "no_authorized_recipients",
        });
      }

      return json(res, 502, { error: "Failed to send message to Telegram.", error_code: "telegram_send_failed" });
    }

    idempotencyCache.set(idempotencyKey, Date.now() + idemTtlMs);
    return json(res, 200, {
      ok: true,
      delivered_count: deliveredCount,
      skipped_count: skippedCount,
      failed_count: failedCount,
    });
  });

  server.listen(PORT, () => {
    console.log(`bot-sender listening on ${PORT}`);
  });
}

bootstrap().catch((error) => {
  console.error(
    JSON.stringify({
      timestamp: nowIso(),
      outcome: "error",
      error_code: "bootstrap_failed",
      detail: error instanceof Error ? error.message : "unknown",
    }),
  );
  process.exit(1);
});
