FROM node:16 AS frontend-build

WORKDIR /usr/src/app
COPY ./frontend/ /usr/src/app

RUN npm install && npm run build

FROM node:16 AS app-build

WORKDIR /usr/src/app
COPY ./backend/src /usr/src/app/src
COPY ./backend/package.json /usr/src/app
RUN npm install 

# COPY ./backend/prisma /usr/src/app
COPY ./backend/start.sh /usr/src/app
COPY ./backend/nodemon.json /usr/src/app
COPY ./backend/tsconfig.json /usr/src/app
COPY ./backend/tsoa.json /usr/src/app/tsoa.json

RUN npm run swagger-generate 
RUN npm run generate --verbose
RUN npm run build

COPY --from=frontend-build /usr/src/app/build/ /usr/src/app/dist/src/web/

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
    DATABASE_URL \
    TOKEN_SECRET  \
    PGHOST \
    PGPORT \
    PGUSER \
    PGPASSWORD \
    PGDATABASE \
    NATS_SERVER_URL

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
# ENV DATABASE_URL=$DATABASE_URL
ENV DATABASE_URL_USERS="postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE?schema=users"
ENV DATABASE_URL_NOTIFICATIONS="postgresql://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE?schema=notifications"
ENV TOKEN_SECRET=$TOKEN_SECRET
ENV NATS_SERVER_URL=$NATS_SERVER_URL

ENV NODE_ENV="DEV"

EXPOSE $PORT
CMD [ "node", "/usr/src/app/dist/src/index.js" ]

# RUN echo 'ping localhost &' > /bootstrap.sh
# RUN echo 'sleep infinity' >> /bootstrap.sh
# RUN chmod +x /bootstrap.sh

# CMD /bootstrap.sh