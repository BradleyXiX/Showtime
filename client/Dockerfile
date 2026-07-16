# Stage 1: Build stage
FROM node:alpine AS build

WORKDIR /app

# Copy package.json and package-lock.json first for layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production serve stage using Nginx
FROM nginx:alpine

# Copy compiled static assets from the build stage to Nginx public directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
