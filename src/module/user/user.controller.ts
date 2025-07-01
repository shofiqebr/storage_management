/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import * as UserService from './user.service';
import { IUser } from './user.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Register User
export const registerUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.registerUser(req.body);
  sendResponse<IUser>(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: user,
  });
});

// Login User
export const loginUserController = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const { user, token } = await UserService.loginUser(email, password);

  sendResponse<{ user: IUser; token: string }>(res, {
    statusCode: 200,
    message: 'Login successful',
    data: { user, token },
  });
});

// Forgot Password
export const forgotPasswordController = catchAsync(async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  await UserService.forgotPassword(email, newPassword);

  sendResponse<null>(res, {
    statusCode: 200,
    message: 'Password reset successful',
    data: null,
  });
});

// Change Password
export const changePasswordController = catchAsync(async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { oldPassword, newPassword } = req.body;
  await UserService.changePassword(userId, oldPassword, newPassword);

  sendResponse<null>(res, {
    statusCode: 200,
    message: 'Password changed successfully',
    data: null,
  });
});

// Get All Users
export const getAllUsersController = catchAsync(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: users,
  });
});

// Get Single User
export const getSingleUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    message: 'User retrieved successfully',
    data: user,
  });
});

// Update User
export const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.updateUser(req.params.id, req.body);
  sendResponse<IUser>(res, {
    statusCode: 200,
    message: 'User updated successfully',
    data: user,
  });
});

// Delete User
export const deleteUserController = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id);
  sendResponse<null>(res, {
    statusCode: 200,
    message: 'User deleted successfully',
    data: null,
  });
});