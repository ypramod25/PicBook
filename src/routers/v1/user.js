//Here we will define routes related to user operations

import express from 'express'
import { signup } from '../../controllers/userController';
import { zodSignupSchema } from '../../validators/zodSignupSchema.js';
import { validate } from '../../validators/zodValidator.js';

const userRouter = express.Router();

userRouter.post('/signup',validate(zodSignupSchema), signup)

export default userRouter;