import { createHmac, randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";

type SubmitPayload = {
  name?: string;
  workEmail?: string;
  company?: string;
  topic?: string;
  message?: string;
  captchaToken?: string;
  website?: string;
  startedAt?: number;
};

type RateEntry = {
  count: number;
  resetAt: number;
};

const TOPICS = new Set(["Program intro", "Scoping call", "Audit brief", "Product demo", "Partnership"]);
const rateLimiter = new Map<string, RateEntry>();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[\p{L}\p{M}\p{N}\s.'-]{2,120}$/u;
const COMPANY_RE = /^[\p{L}\p{M}\p{N}\p{P}\p{S}\s]{2,160}$/u;
const MESSAGE_RE = /^[\p{L}\p{M}\p{N}\p{P}\p{S}\s]{10,4000}$/u;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status });
}

function normalize(value: unknown, max: number) {
  return String(value ?? "").normalize("NFKC").trim().slice(0, max);
}

function getEnvInt(name: string, fallback: number) {
  const raw = process.env[name];
  if (!raw) return fallback;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  return forwardedFor?.split(",")[0]?.trim() || "unknown";
}

function hitRateLimit(ip: string) {
  const windowMs = getEnvInt("APP_RATE_LIMIT_WINDOW_MS", 60_000);
  const maxRequests = getEnvInt("APP_RATE_LIMIT_MAX_REQUESTS", 10);
  const now = Date.now();
  const current = rateLimiter.get(ip);

  if (!current || now >= current.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  current.count += 1;
  return current.count > maxRequests;
}

function signBody(body: string, timestamp: string, secret: string) {
  return createHmac("sha256", secret).update(`${body}.${timestamp}`).digest("hex");
}

export async function POST(request: NextRequest) {
  const requestId = randomUUID();
  const ip = getClientIp(request);

  if (request.headers.get("content-type")?.toLowerCase().startsWith("application/json") !== true) {
    return json(415, { error: "Content-Type must be application/json.", request_id: requestId });
  }

  if (hitRateLimit(ip)) {
    return json(429, { error: "Too many requests.", request_id: requestId });
  }

  let payload: SubmitPayload;
  try {
    payload = (await request.json()) as SubmitPayload;
  } catch {
    return json(400, { error: "Invalid JSON body.", request_id: requestId });
  }

  const name = normalize(payload.name, 120);
  const workEmail = normalize(payload.workEmail, 160);
  const company = normalize(payload.company, 160);
  const topic = normalize(payload.topic, 160);
  const message = normalize(payload.message, 4000);
  const captchaToken = normalize(payload.captchaToken, 4096);
  const website = normalize(payload.website, 256);
  const startedAt = Number(payload.startedAt ?? 0);

  if (website) {
    return json(400, { error: "Spam detected.", request_id: requestId });
  }

  const minFillMs = getEnvInt("MIN_FORM_FILL_MS", 2500);
  if (!Number.isFinite(startedAt) || Date.now() - startedAt < minFillMs) {
    return json(400, { error: "Form submitted too quickly.", request_id: requestId });
  }

  if (!name || !workEmail || !company || !topic || !message || !captchaToken) {
    return json(400, { error: "Please fill all required fields.", request_id: requestId });
  }
  if (!EMAIL_RE.test(workEmail)) {
    return json(400, { error: "Invalid email.", request_id: requestId });
  }
  if (!NAME_RE.test(name) || !COMPANY_RE.test(company) || !MESSAGE_RE.test(message)) {
    return json(400, { error: "Invalid characters in input.", request_id: requestId });
  }
  if (!TOPICS.has(topic)) {
    return json(400, { error: "Invalid topic.", request_id: requestId });
  }

  const botSenderUrl = process.env.BOT_SENDER_URL;
  const hmacSecret = process.env.INTERNAL_HMAC_SECRET;
  if (!botSenderUrl) {
    return json(500, { error: "BOT_SENDER_URL is not configured.", request_id: requestId });
  }
  if (!hmacSecret) {
    return json(500, { error: "INTERNAL_HMAC_SECRET is not configured.", request_id: requestId });
  }

  const body = JSON.stringify({
    name,
    workEmail,
    company,
    topic,
    message,
    captchaToken,
    website,
    ip,
  });

  try {
    const timestamp = String(Math.floor(Date.now() / 1000));
    const signature = signBody(body, timestamp, hmacSecret);
    const idempotencyKey = randomUUID();

    const response = await fetch(botSenderUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Timestamp": timestamp,
        "X-Signature": signature,
        "X-Idempotency-Key": idempotencyKey,
        "X-Request-Id": requestId,
      },
      body,
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as { error?: string; error_code?: string } | null;
      return json(response.status === 502 ? 503 : response.status, {
        error: errorBody?.error ?? "Failed to process request.",
        request_id: requestId,
      });
    }

    return json(200, { ok: true, request_id: requestId });
  } catch (error) {
    console.error(
      JSON.stringify({
        timestamp: new Date().toISOString(),
        outcome: "error",
        error_code: "bot_sender_unreachable",
        request_id: requestId,
        ip,
      }),
      error instanceof Error ? error.message : "unknown",
    );
    return json(503, { error: "Service temporarily unavailable.", request_id: requestId });
  }
}
