import { Logger } from 'winston';
import { OAuth2Client } from 'google-auth-library';
import { Document } from 'mongoose';

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

export interface RefreshTokenProps {
  clientSecret: string;
  clientId: string;
  logger: Logger;
  tokenUrl: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface AccessTokenProps {
  logger: Logger;
  oauth2Client: OAuth2Client;
}
