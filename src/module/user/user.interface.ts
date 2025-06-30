import { USER_ROLE } from "./user.constrants";

export interface IUser {
  name: string;
  id: string; 
  password: string;
  role: USER_ROLE;
  phone?: string;
  address?: string;
  city?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(candidatePassword: string): Promise<boolean>;
  generateToken(): string;
} 
