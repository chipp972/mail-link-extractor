import { Document } from 'mongoose';

export interface UserData {
  email: string;
}

export interface User extends UserData, Document {}
