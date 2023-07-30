FROM node:18

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY public /app/public
COPY src /app/src

COPY README.md ttd_logo1.png /app/

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
