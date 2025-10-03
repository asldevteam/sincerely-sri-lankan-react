# Multi-stage build for production optimization
FROM node:22-alpine AS base

# Dependencies stage - install all dependencies for building
FROM base AS deps
WORKDIR /app
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Builder stage - build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production

# Build the application with Vite
RUN echo "Starting build process..." && \
    npm run build && \
    echo "Build completed. Checking for dist output..." && \
    ls -la dist/ && \
    if [ -d "dist" ]; then \
      echo "Dist output found:" && ls -la dist/; \
    else \
      echo "ERROR: Dist output not found!" && exit 1; \
    fi

# Production image with nginx to serve static files
FROM nginx:alpine AS runner

# Copy the built application from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 4000

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
