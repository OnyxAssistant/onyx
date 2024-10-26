FROM node:18-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./node_modules

RUN yarn install
RUN yarn build

CMD yarn start