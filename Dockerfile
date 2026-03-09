FROM node:22.13-alpine AS web-deps
WORKDIR /app
COPY web/package.json web/package-lock.json ./
RUN npm install

FROM node:22.13-alpine AS web-builder
WORKDIR /app
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
COPY --from=web-deps /app/node_modules ./node_modules
COPY web ./
RUN npm run build

FROM node:22.13-alpine AS web
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=web-builder /app/.next/standalone ./
COPY --from=web-builder /app/.next/static ./.next/static
COPY --from=web-builder /app/public ./public
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

FROM node:22.13-alpine AS bot-sender
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -S nodejs && adduser -S botuser -G nodejs
COPY bot-sender/package.json ./
COPY bot-sender/package-lock.json ./
RUN npm ci --omit=dev
COPY bot-sender/server.js ./server.js
USER botuser
EXPOSE 4000
CMD ["npm", "run", "start"]
