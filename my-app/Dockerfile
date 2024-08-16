# Base image for building the application
FROM node:18-bullseye AS builder

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json package-lock.json ./
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the application (uncomment if you need to build)
# RUN npm run build

# Expose the port (for development)
EXPOSE 3000

# Base image for running the application
FROM node:18-bullseye-slim AS runtime

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the builder stage
#COPY --from=builder /app/package.json /app/package-lock.json /app/
#COPY --from=builder /app/node_modules /app/node_modules
#COPY --from=builder /app/public /app/public

# Only copy the necessary build artifacts if needed
# COPY --from=builder /app/.next /app/.next

# Expose the port
EXPOSE 3000

# Run the application in development mode
CMD ["npm", "run", "dev"]

