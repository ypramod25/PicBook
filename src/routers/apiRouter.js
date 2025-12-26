//this api router is triggered on /api path
import express from 'express'
import v1Router from './v1/v1Router.js';

const apiRouter = express.Router(); // Router object to modularize routes

apiRouter.use('/v1', v1Router);//mount post router on /posts path to handle post related routes

export default apiRouter;