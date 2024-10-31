FROM oven/bun:1-debian

WORKDIR /app

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

COPY package.json bun.lockb /app/
RUN bun install
# RUN bun install --production --frozen-lockfile

COPY . /app/

EXPOSE 5000

CMD ["sh", "-c", "bun run $(test \"$NODE_ENV\" = 'development' && echo 'dev' || echo 'start')"]
