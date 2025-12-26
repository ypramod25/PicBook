// Here all the post related routes are present
// We look at the remaining part or url after /posts path

import express from 'express';
import { createPost } from '../../controllers/postController.js';
import { s3Uploader } from '../../config/multerConfig.js';

const postRouter = express.Router(); // Router object to modularize routes
// You can implement other post related routes here and then export the router

postRouter.post('/', s3Uploader.single('image'), createPost);
postRouter.get('/', getAllPosts);

export default postRouter;