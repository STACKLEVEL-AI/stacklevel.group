FROM node:25-alpine AS deps
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:25-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# NEXT_PUBLIC_* must be available at build time for client bundle
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

COPY --from=deps /app/node_modules ./node_modules
COPY web/ ./
RUN npm run build

FROM node:25-alpine AS web
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

RUN addgroup -S nodejs && adduser -S nextjs -G nodejs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

CMD ["sh", "-c", "HOSTNAME=0.0.0.0 node server.js"]

FROM node:25-alpine AS bot-sender
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=4000
RUN addgroup -S nodejs && adduser -S botuser -G nodejs
COPY bot-sender/package.json bot-sender/package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund
COPY --chown=botuser:nodejs bot-sender/server.js ./server.js
USER botuser
EXPOSE 4000
CMD ["npm", "run", "start"]
