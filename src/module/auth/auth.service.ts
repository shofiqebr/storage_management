import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../user/user.model';
import config from '../../app/config';

const login = async (payload: { id: string; password: string }) => {
  const user = await UserModel.findOne({ id: payload?.id }).select('+password');

  if (!user) {
    throw new Error('User not found!');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password,
  );

  if (!isPasswordMatched) {
    throw new Error('Incorrect password!');
  }

  const jwtPayload = {
    _id: user._id,
    id: user.id,
    role: user.role,
  };

  const token = jwt.sign(jwtPayload, config.jwt.access_secret, {
    expiresIn: '15d',
  });

  return {
    token,
    user: {
      _id: user._id,
      name: user.name,
      id: user.id,
      role: user.role,
    },
  };
};

export const authService = {
  login,
};
