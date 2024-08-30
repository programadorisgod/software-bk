
ARG ALPINE_VERSION=3.19
ARG DIR=/project
ARG USER_GROUP=node:node

FROM node:20-alpine${ALPINE_VERSION} AS development

WORKDIR ${DIR}

COPY --chown=${USER_GROUP} package*.json ./

RUN npm ci

COPY --chown=${USER_GROUP} . .

################################################
#      CONSTRUIR LA IMAGEN PARA PRODUCCIÓN    #
###############################################

FROM development as build

ARG ALPINE_VERSION=3.19
ARG USER_GROUP=node:node

RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR ${DIR}

COPY --chown=${USER_GROUP} package*.js . 

COPY --chown=${USER_GROUP} .  .

RUN pnpm run build

ENV NODE_ENV production

RUN npm ci --omit=dev


################################################
#                PRODUCCIÓN                   #
###############################################
FROM  build  as prod 



ENV PGHOST='ep-solitary-math-a5ckok80.us-east-2.aws.neon.tech'
ENV PGDATABASE='Nekli'
ENV PGUSER='Nekli_owner'
ENV PGPASSWORD='WRhqv3oX0pfx'
ENV ENDPOINT_ID='ep-solitary-math-a5ckok80'

COPY --chown=${USER_GROUP} .  .

ENV NODE_ENV production

CMD ["npm", "run","start"]

