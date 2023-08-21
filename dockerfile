FROM node:16 AS frontend-build

WORKDIR /usr/src/app
COPY ./frontend/ /usr/src/app

RUN npm install && npm run build

FROM node:16 AS app-build

WORKDIR /usr/src/app
COPY ./backend/src /usr/src/app/src
COPY ./backend/package.json /usr/src/app
RUN npm install 

COPY ./backend/start.sh /usr/src/app
COPY ./backend/nodemon.json /usr/src/app
COPY ./backend/tsconfig.json /usr/src/app
COPY ./backend/tsoa.json /usr/src/app/tsoa.json

RUN npm run swagger-generate 
RUN npm run generate
RUN npm run build

COPY --from=frontend-build /usr/src/app/build/ /usr/src/app/dist/src/web/

# Configure environment variables
ENV NODE_ENV="PROD"
ENV PORT=10000
ENV STATIC_URL="localhost"
ENV GIT_BRANCH="main"
ENV DATABASE_URL="postgres://portfolio_8srv_user:8qaLtpd1yji4fA98PNHpfA1wwyAgdCNM@dpg-ccrgkl2rrk08u0lsk9t0-a/portfolio_8srv"
ENV TOKEN_SECRET="asdasdasdsadsadas"
ENV NODE_ENV="DEV"

EXPOSE $PORT
CMD [ "node", "/usr/src/app/dist/src/index.js" ]

# RUN echo 'ping localhost &' > /bootstrap.sh
# RUN echo 'sleep infinity' >> /bootstrap.sh
# RUN chmod +x /bootstrap.sh

# CMD /bootstrap.sh