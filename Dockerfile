FROM node:19-alpine as builder
RUN npm install -g pnpm

WORKDIR /usr/src/app

COPY package*.json ./

RUN pnpm install

# COPY .env ./

COPY . .
WORKDIR /usr/src/app
ENV NODE_ENV=production
ENV VITE_PUBLIC_BASE_PATH=http://knbn-api:8000
RUN pnpm run build

FROM node:19-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/build .
COPY --from=builder /usr/src/app/package.json .
COPY --from=builder /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "--experimental-modules", "index.js"]