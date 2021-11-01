FROM node:latest
WORKDIR /.

COPY db/ ./db
COPY routes/ ./routes
COPY package.json .
COPY app.js .

RUN npm install
EXPOSE 3000

ENTRYPOINT ["node", "app.js"]