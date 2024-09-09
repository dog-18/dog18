FROM node:20-alpine as base

RUN apk update && apk upgrade && apk add dumb-init && apk add --no-cache bash
WORKDIR app

FROM base as build
COPY *.json ./
COPY src ./src
RUN npm i -g pnpm &&\
    pnpm i &&\
    pnpm tsc &&\
    rm -fr node_modules &&\
    pnpm i --prod

FROM base as release
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
EXPOSE 3001
ENV NODE_ENV=production
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["node", "dist"]
