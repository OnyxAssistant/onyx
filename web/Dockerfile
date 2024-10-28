FROM node:18-alpine AS base
WORKDIR /web

FROM base AS deps

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --immutable --immutable-cache --check-cache

FROM deps AS build

COPY . .

RUN yarn build

FROM base AS development

COPY --from=build /web/node_modules /web/node_modules

COPY . .

CMD ["yarn", "dev"]

FROM base AS production

COPY --from=build /web/.next/standalone /web/build
RUN mkdir -p /web/build/.next
COPY --from=build /web/.next/static /web/build/.next/static
COPY --from=build /web/public /web/build/public

CMD ["node", "build/server.js"]
