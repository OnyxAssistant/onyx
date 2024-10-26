FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn prisma:generate

RUN yarn build

CMD ["yarn", "start"]
