FROM node:13

RUN mkdir /app

WORKDIR /app

COPY . /app

RUN ls -lah

RUN npm install 

CMD [ "npm", "start" ]
# Will be changed to a prod setup as soon as possible
