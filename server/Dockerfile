FROM oven/bun

WORKDIR /app

COPY package.json .

RUN bun install --production

COPY src src
COPY tsconfig.json .

CMD ["bun", "dev"]

EXPOSE 3000
