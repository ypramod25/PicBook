import express from 'express';
import { createComment, getCommentById } from '../../controllers/commentController.js';
import { isAuthenticated } from '../../middlewares/authMiddleware.js';

const commentRouter = express.Router();

// Define comment-related routes here

commentRouter.get('/:id', isAuthenticated, getCommentById);
commentRouter.post('/', isAuthenticated, createComment);

export default commentRouter;