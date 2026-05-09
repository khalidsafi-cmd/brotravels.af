# Multi-stage build: API and Web server

# Stage 1: Build the API
FROM node:18-alpine AS api-builder

WORKDIR /app
COPY api/package*.json ./
RUN npm ci --only=production

COPY api/server.js ./

# Stage 2: Setup nginx for static files
FROM nginx:alpine

# Install Node.js in the nginx container for the API
RUN apk add --no-cache nodejs npm

# Copy API from builder stage
COPY --from=api-builder /app /app

# Copy website files to nginx html directory
COPY . /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create a startup script
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'cd /app && node server.js &' >> /start.sh && \
    echo 'nginx -g "daemon off;"' >> /start.sh && \
    chmod +x /start.sh

# Expose ports
EXPOSE 80 3000

# Start both services
CMD ["/start.sh"]