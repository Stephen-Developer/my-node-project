# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm ci --silent

COPY . .
RUN npm run build


# ---------- Production Stage ----------
FROM node:18-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev --silent

# Copy compiled JS
COPY --from=builder /usr/src/app/dist ./dist

# Copy .env file
# COPY .env .env

EXPOSE 3000

CMD ["node", "dist/server.js"]
