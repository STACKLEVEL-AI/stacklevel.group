# stacklevel.group-codex

## Architecture

- `nginx` - reverse proxy, TLS termination, rate limiting for `/api/submit`
- `web` - Next.js app and public endpoint `POST /api/submit`
- `bot-sender` - internal service `POST /internal/send` for CAPTCHA check and Telegram delivery

No database or Redis is used.

## Environment configuration

All required runtime secrets/configuration are provided via `.env`.

1. Copy `.env.example` to `.env`
2. Set values in `.env`
   - `NGINX_HTTPS_PORT`
   - `TLS_CERT_FILE`
   - `TLS_KEY_FILE`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `RECAPTCHA_SECRET_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `RECIPIENT_USER_IDS`
   - `INTERNAL_HMAC_SECRET`
3. Place TLS files referenced by:
   - `TLS_CERT_FILE`
   - `TLS_KEY_FILE`

## Run

```bash
docker compose up --build -d
```

External access is only via nginx HTTPS:

- `https://localhost:${NGINX_HTTPS_PORT}`

## Security model implemented

- only nginx publishes external port
- `web` and `bot-sender` do not publish ports
- `private` Docker network between `web` and `bot-sender` is `internal`
- web signs requests to bot-sender with HMAC (`X-Timestamp`, `X-Signature`)
- bot-sender validates timestamp window and idempotency key
- bot-sender sends notifications only to `RECIPIENT_USER_IDS`
- bot-sender disables Telegram webhook on startup via `deleteWebhook(drop_pending_updates=true)`
