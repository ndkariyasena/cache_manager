FROM        node:16.13.1

WORKDIR     /usr/src/app

COPY        package*.json ./

COPY        .env ./.env

RUN         npm install

COPY        . .

EXPOSE      5000

RUN         npm install -g nodemon

CMD         ["npm", "start"]