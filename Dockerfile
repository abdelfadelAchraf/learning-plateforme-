# Use Node 20 (or 22 LTS)
FROM node:20-alpine

# App directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install deps
RUN npm install

# Copy project
COPY . .

# Expose Vite port
EXPOSE 5173

# Start dev server
CMD ["npm", "run", "dev", "--", "--host"]
