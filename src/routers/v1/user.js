//Here we will define routes related to user operations

import express from 'express'
import { signin, signup } from '../../controllers/userController';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';
import { zodSigninSchema } from '../../validators/zodSigninSchema.js';

const userRouter = express.Router();

userRouter.post('/signup', validate(zodSignupSchema), signup)
userRouter.post('/signin', validate(zodSigninSchema), signin)

export default userRouter;