FROM node:18-alpine3.15

USER root

COPY . .

RUN npm install
RUN npm run build
EXPOSE 5173:5173
RUN npm run dev