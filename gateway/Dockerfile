FROM node:18-alpine AS base
WORKDIR /gateway

RUN apk update && apk add docker git docker-compose

FROM base AS deps

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

FROM deps AS build

COPY . .

RUN yarn prisma:generate
RUN yarn build

FROM base AS development

COPY --from=deps /gateway/node_modules /gateway/node_modules
COPY . .

RUN yarn prisma:generate

CMD ["yarn", "start:dev"]

FROM base AS production

COPY --from=build /gateway/dist ./dist
COPY --from=build /gateway/node_modules ./node_modules

CMD ["node", "dist/main.js"]
