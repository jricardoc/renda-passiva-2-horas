# ==============================================
# Stage 1: Build
# ==============================================
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci --only=production --ignore-scripts

# Copy source
COPY . .

# Build with all optimizations
ENV NODE_ENV=production
RUN npm run build

# Remove dev dependencies and source files
RUN npm prune --production

# ==============================================
# Stage 2: Production
# ==============================================
FROM nginx:alpine

# Copy built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy optimized nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
