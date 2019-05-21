FROM node:10.15
  
EXPOSE 3000

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build
CMD npm run start