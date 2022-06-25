# Docker

## Build

```sh
docker build . -t mdperez/node-portfolio:latest
```

## Run

```sh
docker build --build-arg PORT=9000 . -t mdperez/node-portfolio:latest &&
docker container rm node-portfolio -f &&
docker run --name node-portfolio -p 9000:9000 -d mdperez/node-portfolio:latest &&
docker logs node-portfolio -f
```

## Stop

```sh
docker container rm node-portfolio -f
```

## Logs

```sh
docker logs node-portfolio -f
```

## RUN FRONTEND

**Install packages first**

```
cd frontend && npm start
```

## RUN BACKEND

**Install packages first**

```
cd backend && npm run generate && npm run dev
```
