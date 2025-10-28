# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 2: Production
FROM node:20-alpine AS production
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production
ENV PORT=8000
EXPOSE 8000

CMD ["node", "dist/server.js"]
