# Stage 1: Build stage
FROM node:alpine AS build

WORKDIR /app

# Implement layer caching by copying package.json and package-lock.json
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Stage 2: Production stage
FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

# Copy production dependencies from build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the rest of the source code
COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
