#  Builder
FROM node:lts AS builder
LABEL maintainer="Alex Villeneuve <haleksviller@gmail.com>"

COPY --chown=node:node . /var/www/html/sapper
WORKDIR /var/www/html/sapper

RUN npm install --no-optional && \
    npm run export --production && \
    npm run build --production



# Dependencies
FROM node:lts AS dependencies

ENV NODE_ENV=production

COPY --chown=node:node . /var/www/html/sapper
WORKDIR /var/www/html/sapper

RUN npm install --no-optional --production



# Staging
FROM node:lts-slim AS staging

ENV NODE_ENV=production

COPY --from=builder --chown=node:node \
  /var/www/html/sapper/node_modules /var/www/html/sapper/node_modules
COPY --from=builder --chown=node:node \
  /var/www/html/sapper/build /var/www/html/sapper/build
COPY --from=builder --chown=node:node \
  /var/www/html/sapper/dist /var/www/html/sapper/dist
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/static /var/www/html/sapper/static
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/scripts /var/www/html/sapper/scripts

USER node
EXPOSE 3000 3333
VOLUME [ "/var/www/html/sapper" ]
WORKDIR /var/www/html/sapper

HEALTHCHECK --interval=30s --timeout=30s --start-period=30s \
  CMD node scripts/healthcheck.js

ENTRYPOINT [ "npm" ]
CMD [ "run", "develop" ]



# Production
FROM node:lts-slim AS production

ARG DB_CLIENT=mysql2
ARG DB_HOST=mariadb
ARG DB_DATABASE=elentra_adm
ARG DB_USER=elentra
ARG DB_PASSWORD=password

ENV NODE_ENV=production \
    DB_HOST=${DB_HOST} \
    DB_DATABASE=${DB_DATABASE} \
    DB_USER=${DB_USER} \
    DB_PASSWORD=${DB_PASSWORD}

COPY --from=builder --chown=node:node \
  /var/www/html/sapper/build /var/www/html/sapper/build
COPY --from=builder --chown=node:node \
  /var/www/html/sapper/dist /var/www/html/sapper/dist
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/static /var/www/html/sapper/static
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/pdfs /var/www/html/sapper/pdfs
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/node_modules /var/www/html/sapper/node_modules
COPY --from=dependencies --chown=node:node \
  /var/www/html/sapper/scripts /var/www/html/sapper/scripts

USER node
EXPOSE 3000
VOLUME [ "/var/www/html/sapper", "/var/www/html/sapper/pdfs" ]
WORKDIR /var/www/html/sapper

HEALTHCHECK --interval=30s --timeout=30s --start-period=30s \
  CMD node scripts/healthcheck.js

ENTRYPOINT [ "node" ]
CMD [ "build" ]

