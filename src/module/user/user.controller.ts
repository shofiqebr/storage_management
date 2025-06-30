// src/modules/user/user.controller.ts
import { Request, Response } from 'express';

import * as UserService from './user.service';
import { IUser } from './user.interface';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

export const createUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.createUser(req.body);
  sendResponse<IUser>(res, {
    statusCode: 201,
    message: 'User created successfully',
    data: user,
  });
});

export const getAllUsersController = catchAsync(async (_req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse<IUser[]>(res, {
    statusCode: 200,
    message: 'Users retrieved successfully',
    data: users,
  });
});

export const getSingleUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.getSingleUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: 200,
    message: 'User retrieved successfully',
    data: user,
  });
});

export const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.updateUser(req.params.id, req.body);
  sendResponse<IUser>(res, {
    statusCode: 200,
    message: 'User updated successfully',
    data: user,
  });
});

export const deleteUserController = catchAsync(async (req: Request, res: Response) => {
  await UserService.deleteUser(req.params.id);
  sendResponse<null>(res, {
    statusCode: 200,
    message: 'User deleted successfully',
    data: null,
  });
});
