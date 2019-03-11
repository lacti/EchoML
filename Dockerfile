FROM node:8

# Install
WORKDIR /app/
COPY ./package.json .
COPY ./yarn.lock .
RUN npm install -g yarn
RUN yarn
ADD . .

RUN yarn build

EXPOSE 4000
CMD yarn server
