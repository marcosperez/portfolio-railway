FROM node:16 AS webbuild

WORKDIR /usr/src/app
COPY ./portfolio-mdperez/ /usr/src/app/

RUN npm install 
RUN npm run build

FROM node:16 AS appbuild

WORKDIR /usr/src/app
COPY ./express-ts-videos/prisma /usr/src/app/
COPY ./express-ts-videos/src /usr/src/app/
COPY ./express-ts-videos/package.json /usr/src/app/
COPY ./express-ts-videos/tsconfig.json /usr/src/app/

RUN npm install 
RUN npm run generate
RUN npm run build

COPY --from=webbuild /usr/src/app/build/ /usr/src/app/dist/web/

# Configure environment variables
ARG PORT  \
    RAILWAY_STATIC_URL  \
    RAILWAY_GIT_COMMIT_SHA  \
    RAILWAY_GIT_AUTHOR  \
    RAILWAY_GIT_BRANCH  \
    RAILWAY_GIT_REPO_NAME  \
    RAILWAY_GIT_REPO_OWNER  \
    RAILWAY_GIT_COMMIT_MESSAGE  \
    RAILWAY_HEALTHCHECK_TIMEOUT_SEC  \
    RAILWAY_ENVIRONMENT  \
    DATABASE_URL

ENV PORT=$PORT
ENV RAILWAY_STATIC_URL=$RAILWAY_STATIC_URL
ENV RAILWAY_GIT_COMMIT_SHA=$RAILWAY_GIT_COMMIT_SHA
ENV RAILWAY_GIT_AUTHOR=$RAILWAY_GIT_AUTHOR
ENV RAILWAY_GIT_BRANCH=$RAILWAY_GIT_BRANCH
ENV RAILWAY_GIT_REPO_NAME=$RAILWAY_GIT_REPO_NAME
ENV RAILWAY_GIT_REPO_OWNER=$RAILWAY_GIT_REPO_OWNER
ENV RAILWAY_GIT_COMMIT_MESSAGE=$RAILWAY_GIT_COMMIT_MESSAGE
ENV RAILWAY_HEALTHCHECK_TIMEOUT_SEC=$RAILWAY_HEALTHCHECK_TIMEOUT_SEC
ENV RAILWAY_ENVIRONMENT=$RAILWAY_ENVIRONMENT
ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_URL="postgresql://postgres:dHQog70udERxDzAO2pRM@containers-us-west-72.railway.app:6407/railway"
ENV TOKEN_SECRET="asdasdasdas51345"

EXPOSE $PORT
CMD [ "node", "/usr/src/app/dist/index.js" ]