
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 3000

# TRICK: Create the file that the app looks for to prove it's in a container
RUN touch /.dockerenv

CMD ["npm", "start"]