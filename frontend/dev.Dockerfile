FROM node:18-alpine

WORKDIR /app

COPY . .

RUN rm -rf ./src
RUN rm -rf ./node_modules

RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

ENV NEXT_TELEMETRY_DISABLED 1

CMD yarn dev