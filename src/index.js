import express from 'express';
import { connect } from 'mongoose';
import connectDB from './config/dbConfig.js';
import { createPost } from './controllers/postController.js';
import { s3Uploader } from './config/multerConfig.js';

const PORT = 3000;
const app = express();//create express app server instance

app.use(express.json());//middleware to parse json body 
app.use(express.text());//middleware to parse text body
app.use(express.urlencoded()); //middleware to parse urlencoded body

// GET route examples
app.get('/ping', (req, res) => {
  return res.json({ message: 'pong' });
});

app.get('/hello', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  return res.json({ message: 'Hello World' });
})

// POST route to create a new post with image upload
app.post('/posts', s3Uploader.single('image'), createPost);

//TASK : implement other CRUD routes for posts (Read, Update, Delete)
//read all posts, read post by id, update post by id, delete post by id

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  //Now once the server started we connect to the database
  connectDB();
});
