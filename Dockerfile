# Use Node image with Chrome
FROM node:18-bullseye

# Install AWS CloudWatch Logs agent and other dependencies
RUN apt-get update \
    && apt-get install -y wget gnupg curl unzip \
    && mkdir -p /etc/apt/keyrings /etc/apt/sources.list.d \
    && wget -q -O- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/keyrings/google.gpg \
    && echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/google.gpg] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y google-chrome-stable \
    && google-chrome --version

# Install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip" \
    && unzip awscliv2.zip \
    && ./aws/install \
    && rm -rf aws awscliv2.zip

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

# Set environment variables for Puppeteer and AWS region
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV AWS_REGION=ap-southeast-2

# Start the app with logging
CMD ["sh", "-c", "node dist/src/main.js 2>&1 | tee /dev/console"] 