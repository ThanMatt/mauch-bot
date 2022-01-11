FROM node:14-alpine

WORKDIR /usr/mauch-bot

CMD ["yarn", "start:dev"]