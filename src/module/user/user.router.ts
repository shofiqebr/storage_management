// src/modules/user/user.routes.ts
import express from 'express';
import * as UserController from './user.controller';
import { createUserSchema, updateUserSchema } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const userRouter = express.Router();

userRouter.post('/user/create-user', validateRequest(createUserSchema), UserController.createUserController);
userRouter.get('/user', UserController.getAllUsersController);
userRouter.get('/user/:id', UserController.getSingleUserController);
userRouter.patch('/user/:id', validateRequest(updateUserSchema), UserController.updateUserController);
userRouter.delete('/user/:id', UserController.deleteUserController);

export default userRouter;
