FROM mcr.microsoft.com/playwright:v1.34.0-jammy
WORKDIR /app
RUN mkdir -p /app && yarn add @playwright/test @aws-sdk/client-dynamodb