# REST API (without express)

## Tech Stack
### Backend
- NodeJS, Mongodb, Joi (validation library) 


## Requirements

- Node
- yarn >= 1.19
- Mongodb (Cloud Atlas)
- Docker (optional)

## Setup

Clone the project from `https://github.com/tanujdave/node-rest-api.git` using SSH or HTTPS.

### **Install dependencies**
```sh
cd ./node-rest-api && yarn install
```

### **Start server**
```sh
cd ./node-rest-api && yarn dev
```

### **Docker setup**

1. First run below command to start with docker that install node and mysql services and setup environment variables.
```sh
cd ./node-rest-api && docker-compose up
```

Note: Just hit `http://0.0.0.0:3001` and test the api is running or not.

## APIS

### **Book API**

| API Endpoint  | Method | Description |
| ------------- | ------------- | ------------- |
| `/books`  | GET  | Read all books  |
| `/books`  | POST  | Create new boo  |
| `/books/{bookId}`  | PUT  | Update existing book  |
| `/books/{bookId}`  | DELETE  | Delete book  |



## Project structure
![alt text](https://image.prntscr.com/image/FZx1DAoeQnmempvkPG6WGw.png)

#### **/helpers**
- `accessEnv.js` Read the environment variables and also enable cache for accessing environment variables.

#### **/lib/RestServer**
- `constants` This directory include all the contants variable will using in library.
- `BaseServer.js` The BaseServer include all base structure for rest server.
- `RestServer.js` The RestServer contains all the logic of creating server and handle server request and response.
- `Route.js` Route is the main routing service that handle incoming route and create response based on the request.

### **/models**
- `book.js` The mongoose schema.

### **/routes**
 - Routes folder contains all api routes.

### **/service**
- This service folder contains all API level service.

### **index.js**
- The main application bootstrap file.