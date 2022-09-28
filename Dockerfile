FROM node:16

WORKDIR /app

# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install

RUN npm install snowsql-formatter glob

COPY . .

CMD [ "node", "/app/entrypoint.js" ]
