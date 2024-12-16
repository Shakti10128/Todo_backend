
# Todo Backend

This project is a backend application for managing TODO tasks, developed using the MERN stack. It features CRUD operations (Create, Read, Update, Delete) for tasks, built with Node.js and Express.js as the backend framework and MongoDB for storing task data. The focus of this project is on creating a simple, functional API for task management without implementing user authentication. It demonstrates my understanding of backend development, API creation, and database integration.


## Tech Stack

**Server:** Node, Express, MongoDB


## Run Locally

Clone the project

```bash
  git clone https://github.com/Shakti10128/todo_backend
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file 
 

Add your MongoDB URL

`MONGO_URI = `


 Define your Localhost port

`PORT = `
 
 Add a secret key to create user token to auth

`JWT_SECRET_KEY =`


## API Reference

#### Get all tasks

```http
  GET /api/tasks
```


#### Create task

```http
  POST /api/tasks
```

| Reb Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**|
| `description`      | `string` | **Required** |


#### Update status task

```http
  PUT /api/${id}
```

| Reb body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `status`      | `string` | **Required**|

| parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**|


#### Delete task

```http
  Delete /api/${id}
```
| parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**|


## Screenshots

#### Create Task
![createTaks](https://github.com/user-attachments/assets/29da393f-ba1f-4c25-a855-2c66b876ac81)

#### Get All Tasks
![getAllTasks (2)](https://github.com/user-attachments/assets/e4ae6cc6-9cdf-4376-92c3-01e660943023)

#### Update Task
![updateTaks](https://github.com/user-attachments/assets/6ef1cd1c-647c-4664-9165-5983cc556372)

#### Delete Task
![delete](https://github.com/user-attachments/assets/69fc2318-ae8d-4bc6-9542-c58dd744ce58)

## Authors

- [@ShaktiKumar](https://github.com/Shakti10128)

