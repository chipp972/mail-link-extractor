import { Document } from 'mongoose';
import { User } from './user';

export interface GoogleAccountData {
  email: string;
  userId: string;
  profile: {
    locale: string;
    picture: string;
    googleId: string;
  };
  credentials: {
    access_token: string;
    refresh_token: string;
    expiry_date: number;
  };
}

export interface GoogleAccount extends GoogleAccountData, Document {}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface GoogleAccountManager {
  createAccount: (data: { user: User; code: string }) => Promise<GoogleAccount>;
  refreshToken: (id: string) => Promise<GoogleAccount | null>;
  revokeToken: (id: string) => Promise<GoogleAccount | null>;
  deleteAccount: (id: string) => Promise<GoogleAccount | null>;
}
