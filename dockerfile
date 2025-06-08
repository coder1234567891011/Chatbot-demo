FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# Stage 2: Serve with Express
FROM node:18
WORKDIR /app
COPY --from=builder /app/dist/ ./dist/
COPY package*.json ./
RUN npm ci --omit=dev
RUN ls -l /app/dist
EXPOSE 80
CMD ["node", "server/server.js"]
