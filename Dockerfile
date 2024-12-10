# Stage 1: Install and Build
FROM node:18-alpine AS builder

WORKDIR /home/app

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

# Run tests
RUN npm run test

# Run build the application
RUN npm run build

# Stage 2: Run the Application
FROM node:18-alpine

WORKDIR /home/app

# Copy only the necessary files from the previous stage
COPY --from=builder /home/app/dist  ./dist
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/public ./public
COPY --from=builder /home/app/assets ./assets

COPY package*.json ./

EXPOSE 3000

CMD [ "node", "dist/src/index.js" ]

