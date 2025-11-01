import express from 'express';
import { connect } from 'mongoose';
import connectDB from './config/dbConfig.js';

const PORT = 3000;
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route examples
app.get('/ping', (req, res) => {
  return res.json({ message: 'pong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  //Now once the server started we connect to the database
  connectDB();
});
