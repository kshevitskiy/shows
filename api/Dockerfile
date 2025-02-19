FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port your H3 API runs on
EXPOSE 3000

# Start the server using the package.json script
CMD ["npm", "run", "serve"]