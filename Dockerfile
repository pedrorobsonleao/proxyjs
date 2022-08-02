FROM node:18.7.0-alpine

WORKDIR /app

COPY . .

RUN yarn install

ENTRYPOINT [ "yarn", "--silent", "start" ]