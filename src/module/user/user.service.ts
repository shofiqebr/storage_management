// src/modules/user/user.service.ts

import { IUser } from './user.interface';
import { UserModel } from './user.model';

export const createUser = async (payload: IUser) => {
  const user = await UserModel.create(payload);
  return user;
};

export const getAllUsers = async () => {
  return UserModel.find();
};

export const getSingleUser = async (id: string) => {
  return UserModel.findById(id);
};

export const updateUser = async (id: string, payload: Partial<IUser>) => {
  return UserModel.findByIdAndUpdate(id, payload, { new: true });
};

export const deleteUser = async (id: string) => {
  return UserModel.findByIdAndDelete(id);
};
