FROM node:18-alpine3.15

USER root

COPY . .
RUN ls
RUN npm install
EXPOSE 5173
RUN npm run build
CMD ["npm", "start"]