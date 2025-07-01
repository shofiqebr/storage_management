import { UserModel } from './user.model';
import { IUser } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const registerUser = async (payload: Partial<IUser>) => {
  const existing = await UserModel.findOne({ email: payload.email });
  if (existing) throw new Error('Email already registered');

  const hashedPassword = await bcrypt.hash(payload.password!, 10);
  const user = await UserModel.create({
    fullName: payload.fullName,
    email: payload.email,
    password: hashedPassword,
    storageUsed: 0,
    maxStorage: 15 * 1024 * 1024 * 1024,
  });

  return user;
};

export const loginUser = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
  return { user, token };
};

export const forgotPassword = async (email: string, newPassword: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error('User not found');

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });
};

export const changePassword = async (userId: string, oldPass: string, newPass: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error('User not found');

  const isMatch = await bcrypt.compare(oldPass, user.password);
  if (!isMatch) throw new Error('Old password incorrect');

  const hashedPassword = await bcrypt.hash(newPass, 10);
  await UserModel.findByIdAndUpdate(userId, { password: hashedPassword });
};

export const getAllUsers = async () => {
  return await UserModel.find();
};

export const getSingleUser = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) throw new Error('User not found');
  return user;
};

export const updateUser = async (id: string, payload: Partial<IUser>) => {
  const user = await UserModel.findByIdAndUpdate(id, payload, { new: true });
  if (!user) throw new Error('User not found');
  return user;
};

export const deleteUser = async (id: string) => {
  await UserModel.findByIdAndDelete(id);
};
