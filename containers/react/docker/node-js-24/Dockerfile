FROM node:24

WORKDIR /workspace

COPY ./project/package*.json ./

RUN npm ci

COPY ./project ./

CMD ["npm", "run", "dev"]
