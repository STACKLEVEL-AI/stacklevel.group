# stacklevel.group-codex

## Architecture

- `apache` on the host - reverse proxy, TLS termination, vhost routing for multiple sites
- `web` - Next.js app and public endpoint `POST /api/submit`, exposed only on loopback for Apache
- `bot-sender` - internal service `POST /internal/send` for CAPTCHA check and Telegram delivery

No database or Redis is used.

## Environment configuration

All required runtime secrets/configuration are provided via `.env`.

1. Copy `.env.example` to `.env`
2. Set values in `.env`
   - `WEB_HTTP_PORT`
   - `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
   - `NEXT_PUBLIC_SITE_URL`
   - `RECAPTCHA_SECRET_KEY`
   - `TELEGRAM_BOT_TOKEN`
   - `RECIPIENT_USER_IDS`
   - `INTERNAL_HMAC_SECRET`

`WEB_HTTP_PORT` must be unique on the host because Apache routes requests to the container over `127.0.0.1:${WEB_HTTP_PORT}`.

## Run

```bash
docker compose up --build -d
```

The app is published only on host loopback for Apache:

- `http://127.0.0.1:${WEB_HTTP_PORT}`

## Apache setup

Use [`apache/stacklevel.group.conf`](./apache/stacklevel.group.conf) as the host Apache vhost.

Required Apache modules:

- `proxy`
- `proxy_http`
- `headers`
- `rewrite`
- `ssl`

The vhost should:

- terminate TLS on Apache
- proxy requests to `http://127.0.0.1:${WEB_HTTP_PORT}`
- preserve the original host header
- set `X-Forwarded-Proto=https`
- set `X-Forwarded-Port=443`

## Security model implemented

- only `web` publishes a host port, and only on `127.0.0.1`
- `bot-sender` does not publish ports
- web signs requests to bot-sender with HMAC (`X-Timestamp`, `X-Signature`)
- bot-sender validates timestamp window and idempotency key
- bot-sender sends notifications only to `RECIPIENT_USER_IDS`
- bot-sender disables Telegram webhook on startup via `deleteWebhook(drop_pending_updates=true)`
