FROM node:16-slim

WORKDIR /usr/mauch-bot

CMD ["yarn", "start:dev"]