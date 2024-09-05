FROM oven/bun:latest as base

RUN apt update && apt upgrade && apt install -y bash dumb-init && apt clean
#WORKDIR app

FROM base as deps

COPY package.json bun.lockb ./
RUN bun install --ignore-scripts

FROM deps as build

ENV PATH /home/bun/app/node_modules/.bin:$PATH

COPY src src
COPY .barrelsby.json tsconfig.json ./

RUN bun run _build && bun run clean && bun install --production --ignore-scripts

FROM base as release

COPY --from=build /home/bun/app/node_modules node_modules
COPY --from=build /home/bun/app/dist dist

# use dumb-init to avoid PID 1
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD ["bun", "dist/src/index.js"]


