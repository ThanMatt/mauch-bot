FROM node:14-alpine

WORKDIR /usr/app

COPY package.json .

COPY yarn.lock .

RUN yarn install

RUN yarn global add nodemon

RUN yarn global add @babel/node

COPY . .

EXPOSE 4000