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
- [x] Add swagger
- [x] Add helmet
- [x] Add react router
- [x] Add basic login page
- [x] Add basic auth
- [x] Add basic Home Page for Videos
- [x] Add Basic (Admin)
- [x] Add Basic (Admin)
- [x] Add Basic (Admin)
- [ ] Add Roles to auth (usuario)
- [ ] Add Event Drive access log
- [ ] Add middleware or something to limit temp admin users
- [ ] Add Admin Page
  - [ ] List Users
  - [ ] "Upload" videos and descriptions
- [ ] Read about tRPC and implement if its useful
- [ ] Add Video Page
  - List Videos with basic filters
- [ ] Add Cache with redis/memcache
- [ ] Add example metrics (Standart)
- [ ] Add example with GrapQL

## Docker

### Build Image

```sh
docker build . -t mdperez/node-portfolio:latest
```

### Run Image

```sh
docker build --build-arg PORT=10000 . -t mdperez/node-portfolio:latest &&
docker container rm node-portfolio -f &&
docker run --name node-portfolio -p 10000:10000 -d mdperez/node-portfolio:latest &&
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
