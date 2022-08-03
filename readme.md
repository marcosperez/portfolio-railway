# App React/Node for DEMO

Both Frontend and Backend run in the same container, Its only for simplicity.

## Run project with docker

```sh
docker-compose up  --build
```

## TODO

- [x] Basic DDD
- [x] Basic Unit Test
- [x] Basic Integration Test
- [x] Translate all frontend
- [x] Remove all warnings in frontend
- [ ] Add swagger
- [ ] Add helmet
- [ ] Add Simple Home Page for Videos
- [ ] Add Basic users roles (Admin/Guest)
- [ ] Add Cache with redis/memcache
- [ ] Add simple endpoint for temporary admin user (cache)
- [ ] Add middleware or something to limit temp admin users
- [ ] Add Admin Page
  - [ ] List Users
  - [ ] "Upload" videos and descriptions
- [ ] Add Video Page
  - List Videos with basic filters
- [ ] Add example with GrapQL
- [ ] Add example metrics (Standart)

## Docker

### Build Image

```sh
docker build . -t mdperez/node-portfolio:latest
```

### Run Image

```sh
docker build --build-arg PORT=9000 . -t mdperez/node-portfolio:latest &&
docker container rm node-portfolio -f &&
docker run --name node-portfolio -p 9000:9000 -d mdperez/node-portfolio:latest &&
docker logs node-portfolio -f
```

### Stop Container

```sh
docker container rm node-portfolio -f
```

### View Logs

```sh
docker logs node-portfolio -f
```

### RUN FRONTEND DEV

**Install packages first**

```
cd frontend && npm start
```

### RUN BACKEND DEV

**Install packages first**

```
cd backend && npm run generate && npm run dev
```
