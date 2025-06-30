/* eslint-disable @typescript-eslint/no-empty-object-type */
// src/modules/user/user.model.ts
import { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser, IUserMethods } from './user.interface';

type TUserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, TUserModel, IUserMethods>(
  {
    name: { type: String, required: true },
    id: { type: String, unique: true, required: true },
    password: { type: String, required: true,  },
    role: {
      type: String,
      enum: ['admin', 'teacher', 'student'],
      required: true,
    },
    phone: String,
    address: String,
    city: String,
  },
  { timestamps: true }
);

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const hashed = await bcrypt.hash(this.password, 10);
  this.password = hashed;
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
};

export const UserModel = model<IUser, TUserModel>('User', userSchema);
