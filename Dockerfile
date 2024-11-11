# Use an official Node.js runtime as a parent image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "run", "dev"]
