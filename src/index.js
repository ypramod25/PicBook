import express from 'express';
import connectDB from './config/dbConfig.js';
// import apiRouter from './routers/apiRouter.js';
import { isAuthenticated } from './middlewares/authMiddleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { options } from './utils/swaggerOptions.js';
import ip from 'ip';
import rateLimit from 'express-rate-limit';

// Swagger setup
const swaggerDocs = swaggerJSDoc(options);

const PORT = 3000;

const app = express();//create express app server instance

// Rate Limiter Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

app.use(limiter); // Apply rate limiting to all requests

app.use(express.json());//middleware to parse json body 
app.use(express.text());//middleware to parse text body
app.use(express.urlencoded()); //middleware to parse urlencoded body

// app.use('/api', apiRouter);//mount api router on /api path to handle all api routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));//swagger api docs route

app.get('/hello', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const ipadd = ip.address();
  return res.json({ message: 'Hello World', ip: ipadd });
})


//TASK : implement other CRUD routes for posts (Read, Update, Delete)
//read all posts, read post by id, update post by id, delete post by id

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  //Now once the server started we connect to the database
  connectDB();
});
