# ---------- Build Stage ----------
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# ---------- Production Stage ----------
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./
RUN npm install --only=production

# Copy compiled JS
COPY --from=builder /usr/src/app/dist ./dist

# Copy .env file
# COPY .env .env

EXPOSE 3000

CMD ["node", "dist/server.js"]
