# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use an official Nginx image to serve the built files
FROM nginx:stable-alpine

# Copy the built files from the previous step
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80 to access the application
EXPOSE 80

# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
