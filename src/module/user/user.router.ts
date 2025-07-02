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


router.post('/register', validateRequest(userRegisterValidation), UserController.registerUserController);
router.post('/login', validateRequest(userLoginValidation), UserController.loginUserController);
router.post('/forgot-password', validateRequest(userForgotPassValidation), UserController.forgotPasswordController);
router.patch('/change-password', auth, validateRequest(userChangePassValidation), UserController.changePasswordController);


router.get('/all', auth, UserController.getAllUsersController);
router.get('/:id', auth, UserController.getSingleUserController);
router.patch('/:id', auth, validateRequest(userUpdateValidation), UserController.updateUserController);
router.delete('/:id', auth, UserController.deleteUserController);

export const UserRoutes = router;
