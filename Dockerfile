# Use Node image with Chrome
FROM node:18-bullseye

# Install additional dependencies for Puppeteer
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && mkdir -p /etc/apt/keyrings /etc/apt/sources.list.d \
    && wget -q -O- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/keyrings/google.gpg \
    && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && google-chrome --version

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI
RUN npm install
RUN npm install -g @nestjs/cli

# Copy app source
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3001

# Set environment variables for Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Start the app
CMD ["node", "dist/src/main.js"] 