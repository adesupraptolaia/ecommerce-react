FROM nginx:stable
MAINTAINER "ades@alterra.id"

RUN mkdir -p /alterra/www.adesphone.xyz/reak
RUN mkdir -p /alterra/logs/nginx

COPY default.conf /etc/nginx/conf.d/
COPY . /alterra/www.adesphone.xyz/reak

WORKDIR /alterra/www.adesphone.xyz/reak
