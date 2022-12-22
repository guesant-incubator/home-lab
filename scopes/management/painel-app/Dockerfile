FROM node:lts as base
WORKDIR /app
COPY package.json package-lock.json /app/

FROM base as prod-deps
RUN apt update && apt install wakeonlan
RUN npm ci --omit=dev

FROM prod-deps as dev-deps
RUN npm ci

FROM dev-deps as assets
COPY . /app/
RUN npm run build
RUN rm -rf node_modules

FROM prod-deps
COPY --from=assets /app /app
CMD npm run start