import { Router } from 'express';
import * as UserController from "./user.controller";
import {
  userRegisterValidation,
  userLoginValidation,
  userForgotPassValidation,
  userChangePassValidation,
  userUpdateValidation,
} from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';


const router = Router();

router.post('/user/register', validateRequest(userRegisterValidation), UserController.registerUserController);
router.post('/user/login', validateRequest(userLoginValidation), UserController.loginUserController);
router.post('/user/forgot-password', validateRequest(userForgotPassValidation), UserController.forgotPasswordController);
router.patch('/user/change-password', auth, validateRequest(userChangePassValidation), UserController.changePasswordController);

router.get('/user/all', auth, UserController.getAllUsersController);
router.get('/user/:id', auth, UserController.getSingleUserController);
router.patch('/user/:id', auth, validateRequest(userUpdateValidation), UserController.updateUserController);
router.delete('/user/:id', auth, UserController.deleteUserController);

export const UserRoutes = router;
