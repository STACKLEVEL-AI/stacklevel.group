FROM node:25-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup -S nodejs && adduser -S botuser -G nodejs

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

COPY --chown=botuser:nodejs server.js ./server.js

USER botuser

EXPOSE 4000

CMD ["npm", "run", "start"]
