# Use Node.js version 18 or higher
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first to install dependencies
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the Angular project files
COPY . .

# Build the Angular project for production
RUN npm run build --prod

# Expose the port that Angular runs on
EXPOSE 4200

# Command to run the Angular app (can be replaced by another server if needed)
CMD ["npm", "start"]
