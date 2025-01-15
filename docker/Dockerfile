# Stage 1: Build the application
FROM node:18 AS builder
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Stage 2: Run the application
FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html

# Copy built Next.js app to Nginx
COPY --from=builder /app/.next /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
