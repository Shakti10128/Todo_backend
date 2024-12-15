import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

// importing database function for connecting the base
import connectDB from './database/database.js';

// let's import all routes here
import userRoute from './routes/userRoutes.js'
import todoRoute from './routes/todoRoutes.js';


// to access all the env variable
import { config } from 'dotenv'; 'dotenv'
config({
    path:"./config.env"
})


const app = express();
app.use(cookieParser());
// to parse the json data from req.body
app.use(express.json());

// allow all origin to req the api
// Use cors to allow requests from your frontend
app.use(cors({
    origin: '*', // Replace with your frontend's deployed domain
    methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
}));



// let's connect the database
connectDB();

// let's use all routes here
app.use('/api',userRoute);
app.use('/api',todoRoute);


app.listen(process.env.PORT,()=>{
    console.log('server is running on:',process.env.PORT);
})