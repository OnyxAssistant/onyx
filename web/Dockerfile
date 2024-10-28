FROM node:18-alpine AS development

WORKDIR /web

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "dev"]

FROM node:18-alpine AS build

WORKDIR /web

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --immutable --immutable-cache --check-cache

COPY . .

RUN yarn build

FROM build AS production

WORKDIR /web
COPY --from=build /web/.next/standalone /web/build
RUN mkdir -p /web/build/.next
COPY --from=build /web/.next/static /web/build/.next/static
COPY --from=build /web/public /web/build/public

CMD ["node", "build/server.js"]
