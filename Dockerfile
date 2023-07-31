FROM node:18-bullseye-slim as admin
WORKDIR /app
COPY . .
WORKDIR /app/cogo-control
CMD ["yarn","start","-p", "4160"]