# Use Node.js 18 on Linux
FROM node:18-slim

# Install dependencies for Puppeteer
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && mkdir -p /etc/apt/sources.list.d \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies and NestJS CLI
RUN npm install
RUN npm install -g @nestjs/cli

# Copy app source
COPY . .

# Debug: Show directory structure before build
RUN echo "=== Directory contents before build ===" && \
    ls -la && \
    echo "=== src directory contents ===" && \
    ls -la src/

# Build with verbose output
RUN npm run build

# Debug: Show directory structure after build
RUN echo "=== Directory contents after build ===" && \
    ls -la && \
    echo "=== dist directory contents (if exists) ===" && \
    ls -la dist/ || echo "dist directory not found"

# Expose port
EXPOSE 3001

# Start the app with more verbose Node.js output
CMD ["node", "dist/src/main.js"] 