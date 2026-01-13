# ---------- Build Stage ----------
FROM node:20 AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source code
COPY . .

# Build the React app
RUN npm run build


# ---------- Production Stage ----------
FROM nginx:alpine

# Copy built files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for the container
EXPOSE 80

# Nginx runs automatically as the default CMD
