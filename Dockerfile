# Build stage
FROM node:20-alpine AS builder

#set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies using npm ci for a clean install
RUN npm ci

# Copy tsconfig and source files
COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 8900

CMD ["node", "dist/server.js"]
