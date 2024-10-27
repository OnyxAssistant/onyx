# Base stage
FROM node:18-alpine AS base
WORKDIR /app

# Backend dependencies stage
FROM base AS backend-deps

COPY backend/package.json ./backend/
COPY backend/yarn.lock ./backend/
WORKDIR /app/backend
RUN yarn install --immutable --immutable-cache --check-cache

# Frontend dependencies stage
FROM base AS frontend-deps

COPY frontend/package.json ./frontend/
COPY frontend/yarn.lock ./frontend/
WORKDIR /app/frontend
RUN yarn install --immutable --immutable-cache --check-cache

# Backend build stage
FROM backend-deps AS backend-build
COPY backend .
RUN yarn prisma:generate
RUN yarn build

# Frontend build stage
FROM frontend-deps AS frontend-build
COPY frontend .
RUN yarn build

# Development stage
FROM base AS development

COPY --from=backend-deps /app/backend/node_modules /app/backend/node_modules
COPY --from=frontend-deps /app/frontend/node_modules /app/frontend/node_modules
COPY backend /app/backend
COPY frontend /app/frontend
RUN cd /app/backend && yarn prisma:generate

ENV APP_MODE=development

EXPOSE 3000
EXPOSE 5000

# Start script
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]

# Production stage
FROM base AS production

COPY --from=frontend-build /app/frontend/.next/standalone /app/frontend/build
RUN mkdir -p /app/frontend/build/.next
COPY --from=frontend-build /app/frontend/.next/static /app/frontend/build/.next/static
COPY --from=frontend-build /app/frontend/public /app/frontend/build/public

COPY --from=backend-build /app/backend/node_modules /app/backend/node_modules
COPY --from=backend-build /app/backend/dist /app/backend/dist

# Set environment variable to determine the mode
ENV APP_MODE=production

EXPOSE 3000
EXPOSE 5000

# Start script
COPY scripts/start.sh /app/start.sh
RUN chmod +x /app/start.sh

CMD ["/app/start.sh"]
