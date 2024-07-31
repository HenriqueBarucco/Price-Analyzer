FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
#COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM ghcr.io/puppeteer/puppeteer:16.1.0

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app
COPY --from=builder /app/dist /app/dist

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]