# Use a lightweight base image like node:alpine
FROM node:alpine

# Set the environment to production
ENV NODE_ENV=production

# Set the working directory
WORKDIR /app

# Implement layer caching by copying package.json and package-lock.json
COPY package.json package-lock.json ./

# Run npm install to install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Ensure the container starts using node directly
CMD ["node", "server.js"]
