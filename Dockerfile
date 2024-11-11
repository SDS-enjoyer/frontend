# Use an official Node.js runtime as a parent image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Ensure the .env file is copied
COPY .env.local .env
# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "run" ,"dev"]