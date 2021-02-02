FROM node:10

ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

RUN mkdir -p /app

COPY . /app/referee
WORKDIR /app/referee

RUN sed -i '/proxy/d' /app/referee/packages/client/package.json
RUN yarn install && yarn bootstrap && yarn build

ENV PORT 3000
EXPOSE 3000

CMD ["yarn", "server-start"]