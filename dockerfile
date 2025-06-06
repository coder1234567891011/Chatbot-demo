FROM node:22 AS builder
WORKDIR /app
COPY ./frontend ./frontend
WORKDIR /app/frontend
RUN npm ci && npm run build --configuration=production

# === Final Image ===
FROM node:22
WORKDIR /app

# Install backend dependencies and http-server + concurrently
COPY src/server src/server
COPY package.json .
RUN npm install && npm install -g http-server concurrently

# Copy built Angular app
COPY --from=builder /app/frontend/dist/your-angular-app-name ./frontend-dist

# Expose both ports
EXPOSE 3000 8080

# Start both servers concurrently
CMD concurrently \
  "http-server ./frontend-dist -p 8080" \
  "node src/server/server.js"