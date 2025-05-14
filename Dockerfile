FROM node:latest

RUN npm install -g expo

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8081

ENTRYPOINT ["npm", "run"]
CMD ["web"]

