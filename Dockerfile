FROM node:18-alpine

WORKDIR /usr/src/app

#Install dependencies
COPY package.json package-lock.json* ./
RUN npm install --only=production

#Copy app files
COPY . .

#Expose port
EXPOSE 3000

#Start the app
CMD ["node", "server.js"]