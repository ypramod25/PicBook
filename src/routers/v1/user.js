//Here we will define routes related to user operations

import express from 'express'
import { signin, signup } from '../../controllers/userController.js';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const userRouter = express.Router();

/**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 */

userRouter.post('/signup', validate(zodSignupSchema), signup)
userRouter.post('/signin', validate(zodSigninSchema), signin)

export default userRouter;