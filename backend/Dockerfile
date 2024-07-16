FROM node:lts-alpine

RUN mkdir -p /src

COPY package.json src/package.json

WORKDIR /src

RUN npm install --only=production --silent

COPY . /src

CMD [ "node", "./index.js" ]
