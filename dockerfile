FROM node:22 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Express
FROM node:22
WORKDIR /app
COPY --from=builder /app/dist/demo ./dist/demo
COPY --from=builder /app/server ./server
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 8080
CMD ["node", "src/server/server.js"]