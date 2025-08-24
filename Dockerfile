# Use an official Node.js runtime as a parent image
FROM node:22-alpine

WORKDIR /app

# Copy deps files
COPY package*.json ./

RUN npm install

# Copy source
COPY . .

# Build TypeScript
RUN npm run build

EXPOSE 3000

# Run app in production
CMD ["npm", "start"]
