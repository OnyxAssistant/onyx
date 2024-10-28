FROM node:18-alpine AS development

WORKDIR /gateway

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn prisma:generate

CMD ["yarn", "start:dev"]

FROM node:18-alpine AS build

WORKDIR /gateway

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

COPY . .

RUN yarn prisma:generate
RUN yarn build

FROM build AS production

WORKDIR /gateway

COPY --from=build /gateway/dist ./dist
COPY --from=build /gateway/node_modules ./node_modules

CMD ["node", "dist/main.js"]
