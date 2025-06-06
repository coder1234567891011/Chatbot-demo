FROM node:22 AS builder
WORKDIR /app
COPY ./src ./src
WORKDIR /app
RUN npm ci && npm run build --configuration=production

# === Final Image ===
FROM node:22
WORKDIR /app

# Install backend dependencies and http-server + concurrently
COPY ./server ./server
COPY package.json .
RUN npm install && npm install -g http-server concurrently

# Copy built Angular app
COPY --from=builder /app/src/dist/Chatbot-demo ./src-dist

# Expose both ports
EXPOSE 3000 8080

# Start both servers concurrently
CMD concurrently \
  "http-server ./src-dist -p 8080" \
  "node server/server.js"