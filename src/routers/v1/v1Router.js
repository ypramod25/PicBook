import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';

const v1Router = express.Router(); // Router object to modularize routes    

v1Router.use('/posts', postRouter);//mount post router on /posts path to handle post related routes 
v1Router.use('/users', userRouter);//mount user router on /users path to handle user related routes

export default v1Router;