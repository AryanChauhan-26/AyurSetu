# Multi-stage Dockerfile for AyurSetu Fullstack Application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy root and server package manifests
COPY package*.json ./
COPY server/package*.json ./server/

# Install dependencies
RUN npm ci
RUN npm --prefix server ci

# Copy full source
COPY . .

# Build both client and server
RUN npm run build

# Production runtime image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5001

# Copy built server artifacts and dependencies
COPY --from=builder /app/server/dist ./server/dist
COPY --from=builder /app/server/node_modules ./server/node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server/data ./server/data
COPY --from=builder /app/package*.json ./

EXPOSE 5001

CMD ["node", "server/dist/server.js"]
