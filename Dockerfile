FROM node:12

WORKDIR /usr/src/app

COPY package.json .

COPY yarn.lock .

RUN yarn install

RUN yarn global add nodemon

COPY . .

EXPOSE 4000