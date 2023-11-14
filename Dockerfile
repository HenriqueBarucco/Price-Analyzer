FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
#COPY prisma ./prisma/

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package*.json /app
COPY --from=builder /app/dist /app/dist

RUN apt-get update && apt-get install -y wget

RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb

RUN npm install

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]