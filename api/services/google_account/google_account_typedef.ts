import { OAuth2Client } from 'google-auth-library';
import { Document } from 'mongoose';

export interface GoogleAccountData {
  googleId: string;
  email: string;
  locale: 'fr' | 'en' | string;
  token: string; // access token or refresh token
  tokenExpiryDate: number;
}

export interface GoogleAccount extends GoogleAccountData, Document {}

export interface RefreshTokenProps {
  clientSecret: string;
  clientId: string;
  refreshToken: string;
  tokenUrl: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  expires_in: number;
}

export interface AccessTokenProps {
  code: string;
  oauth2Client: OAuth2Client;
}
