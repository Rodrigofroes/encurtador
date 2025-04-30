# syntax=docker/dockerfile:1

# Base Node.js image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Build backend
FROM base AS backend-build
WORKDIR /app/backend

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm ci

# Copy backend source code
COPY backend/src ./src
COPY backend/tsconfig.json ./

# Build TypeScript code
RUN npm run build || npx tsc

# Final image
FROM base
WORKDIR /app

# Environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Copy built backend
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/dist ./dist

# Create public directory
RUN mkdir -p public

# Copy frontend files to public directory
COPY frontend ./public

# Copy notfound.html to public directory
COPY frontend/notfound.html ./public/

# Expose the port
EXPOSE 3001

# Create a non-root user
RUN adduser -D appuser
USER appuser

# Start the application
CMD ["node", "dist/index.js"]