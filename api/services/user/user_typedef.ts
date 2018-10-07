import { Document } from 'mongoose';

export interface UserData {
  email: string;
}

export interface User extends UserData, Document {}

export interface UserManager {
  create: (data: UserData) => Promise<User>;
  read: (id: string) => Promise<User | null>;
  update: (id: string, data: Partial<UserData>) => Promise<User | null>;
  delete: (id: string) => Promise<User | null>;
}
