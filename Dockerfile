FROM nginx:alpine

WORKDIR /usr/share/nginx/http

COPY . .

EXPOSE 80