ARG ALPINE_VERSION=3.19
ARG DIR=/project
ARG USER_GROUP=node:node

################################################
#      CONSTRUIR LA IMAGEN PARA LOCAL   #
###############################################

FROM node:20-alpine${ALPINE_VERSION} as development

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR ${DIR}

COPY  package*.json .

RUN npm ci

COPY  . .


CMD ["pnpm", "run", "dev" ]



