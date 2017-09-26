FROM node:alpine

MAINTAINER Jon Borgonia "jon@devleague.com"

COPY index.js /srv/
COPY replies.js /srv/
COPY package.json /srv/
COPY package-lock.json /srv/

RUN cd /srv && npm install --production

ENV SLACK_BOT_TOKEN=xoxb-246038784437-3CZSk8m2S3IN2co6PlwxACs3
ENV SLACK_CHANNEL=test-bots
ENV WAIFU_TARGET=nathan

WORKDIR /srv

CMD ["node", "."]
