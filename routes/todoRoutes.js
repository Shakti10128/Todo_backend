import exress from 'express';
import { createTask, deleteTask, getAllTasks, getSingleTask, updateTask } from '../controllers/todoController.js';


const todoRoute = exress.Router();

todoRoute.post('/tasks',createTask);
todoRoute.get('/tasks',getAllTasks);
todoRoute.get('/tasks/:id',getSingleTask);
todoRoute.put('/tasks/:id',updateTask);
todoRoute.delete('/tasks/:id',deleteTask);


// if we are going to use auth fucntionality
// import isAuth from '../middlewares/userMiddleware.js';

// todoRoute.post('/tasks',isAuth,createTask);
// todoRoute.get('/tasks',isAuth,getAllTasks);
// todoRoute.get('/tasks/:id',isAuth,getSingleTask);
// todoRoute.put('/tasks/:id',isAuth,updateTask);
// todoRoute.delete('/tasks/:id',isAuth,deleteTask);

export default todoRoute;