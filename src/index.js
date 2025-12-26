import express from 'express';
import connectDB from './config/dbConfig.js';
import apiRouter from './routers/apiRouter.js';

const PORT = 3000;
const app = express();//create express app server instance

app.use(express.json());//middleware to parse json body 
app.use(express.text());//middleware to parse text body
app.use(express.urlencoded()); //middleware to parse urlencoded body

app.use('/api', apiRouter);//mount api router on /api path to handle all api routes

app.get('/hello', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  return res.json({ message: 'Hello World' });
})


//TASK : implement other CRUD routes for posts (Read, Update, Delete)
//read all posts, read post by id, update post by id, delete post by id

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  //Now once the server started we connect to the database
  connectDB();
});
