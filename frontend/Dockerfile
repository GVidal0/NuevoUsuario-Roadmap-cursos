FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@12.15.0 --activate

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

ENV DOCKER_ENV=true

EXPOSE 5173

CMD ["pnpm", "dev", "--host", "0.0.0.0"]

