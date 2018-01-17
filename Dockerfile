FROM node:9.2.0
LABEL MAINTAINER="Victor Gama <hey@vito.io>"

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm i

# Default HTTP Port
EXPOSE 3333

# Hot-reload WS Port
EXPOSE 9485
CMD npm start
