// Here all the post related routes are present
// We look at the remaining part or url after /posts path

import express from 'express';
import { createPost, deletePostById, updatePost } from '../../controllers/postController.js';
import { s3Uploader } from '../../config/multerConfig.js';
import { validate } from '../../validators/zodValidator.js';
import { zodPostSchema } from '../../validators/zodPostSchema.js';
import { isAdmin, isAuthenticated } from '../../middlewares/authMiddleware.js';

const postRouter = express.Router(); // Router object to modularize routes
// You can implement other post related routes here and then export the router

/**
 * @swagger
 * /api/v1/posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post created successfully
 */

postRouter.post('/', isAuthenticated, s3Uploader.single('image'), validate(zodPostSchema), createPost);
postRouter.get('/', getAllPosts);
postRouter.delete('/:id', isAuthenticated, deletePostById);
postRouter.put('/:id', isAuthenticated, isAdmin, s3Uploader.single('image'), updatePost);

export default postRouter;
