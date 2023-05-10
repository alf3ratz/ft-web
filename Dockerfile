FROM node:14

# Working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the project files
COPY . .

# Expose the server port
EXPOSE 3000

# Command to start the server
CMD ["npm", "start"]