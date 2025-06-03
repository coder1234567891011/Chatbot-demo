FROM node:22

WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Install globally the `concurrently` tool
RUN npm install -g concurrently

# Expose the ports your processes need (adjust if necessary)
EXPOSE 8080 3000

# Run both processes in parallel
CMD ["concurrently", "--kill-others", "--names", "frontend,backend", "npm start", "node src/server/server.js"]
