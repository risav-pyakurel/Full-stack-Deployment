FROM node:18-alpine
WORKDIR /usr/src/app
RUN apk add --no-cache dumb-init

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY package*.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY . .

RUN chown -R nodejs:nodejs /usr/src/app
USER nodejs

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "server.js"] 