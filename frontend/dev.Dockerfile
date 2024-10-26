FROM node:18-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./src
RUN rm -rf ./node_modules

RUN yarn install

CMD yarn dev