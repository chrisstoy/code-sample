# Create Express server
FROM node:latest

RUN mkdir -p /server/

WORKDIR /server

COPY db/ ./db
COPY routes/ ./routes
COPY package.json .
COPY app.js .

RUN npm install
EXPOSE 3000

CMD ["node", "app.js"]
