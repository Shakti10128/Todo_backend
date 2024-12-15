import express from 'express';
import { createUser, login, logout } from '../controllers/userController.js';

const userRoute = express.Router();

userRoute.post('/users/createUser',createUser);
userRoute.post('/users/login',login);
userRoute.get('/users/logout',logout);

export default userRoute;

