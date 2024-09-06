FROM node:20-alpine as base

RUN apk update && apk upgrade && apk add dumb-init && apk add --no-cache bash
WORKDIR app

COPY *.json .
COPY src ./src

RUN npm i -g pnpm && pnpm i

EXPOSE 3000
ENV NODE_ENV=production

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["pnpm", "dev"]
