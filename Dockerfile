FROM node:14-buster-slim AS development

RUN apt-get update && apt-get install -y procps

WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn
RUN yarn add glob rimraf
COPY . .

EXPOSE 3000 3306