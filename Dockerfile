FROM node:20

WORKDIR /app

COPY . /app

RUN yarn install

CMD yarn start