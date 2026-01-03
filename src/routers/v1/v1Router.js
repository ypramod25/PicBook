import express from 'express';
import postRouter from './post.js';
import userRouter from './user.js';
import commentRouter from './comment.js';

const v1Router = express.Router(); // Router object to modularize routes    

v1Router.use('/posts', postRouter);//mount post router on /posts path to handle post related routes 
v1Router.use('/users', userRouter);//mount user router on /users path to handle user related routes
v1Router.use('/comment', commentRouter);//mount comment router on /comments path to handle comment routes

export default v1Router;