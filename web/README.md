# stacklevel-web

This directory contains the `Next.js` application used by the root Docker stack.

## Local development

Run the frontend directly from this folder when you only need the app server:

```bash
npm run dev
```

The dev server listens on `http://localhost:3000`.

## Production-like run

Use the root project compose file:

```bash
cd ..
docker compose up --build -d
```

In deployment, `nginx` publishes only `127.0.0.1:${WEB_HTTP_PORT}` and proxies requests to this app.

## Routing

- `/` redirects to the preferred locale from `Accept-Language`
- localized pages live under `/ru/*` and `/en/*`
- legacy routes from the old site redirect to localized `React` and `PHP` pages

See the root [`README.md`](../README.md) for the full stack and deployment topology.
