# Specify a bas image
FROM node:lts-alpine 

WORKDIR /app

# Insall some Dependencies
COPY package.json .
RUN npm install --only=prod
COPY . .

#DEfault command
CMD [ "npm","run","dev" ]

