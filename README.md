# namesList
You need:
  - yarn or npm
  - docker and docker-compose
to run this project.

Once you installed them and cloned this repository on your computer run the following in the root project directory:
```
  docker compose up -d
```
It will create and start a mariadb container.

Then open a second terminal in root project directory. In the first one run:
```
  cd ./server
  yarn install // or npm install
  yarn run dev // or npm run dev
```

In the second terminal run:
```
  cd ./client
  yarn install // or npm install
  yarn run dev // or npm run dev
```
  
To exit server or client press Ctrl+C.

To stop mariadb run the following in the root project directory:
```
  docker compose down
```
To delete mariadb container run:
```
  docker rm docker-mariadb
```
