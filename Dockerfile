# Stage 1: Build production code
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only production deps + build output
COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

# Default command to run production build
CMD ["node", "dist/main"]
