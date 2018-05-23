import { OAuth2Client } from 'google-auth-library';
import { Connection } from 'mongoose';

declare global {
  interface Services {
    mongoose: Connection;
    googleAuth: OAuth2Client;
  }
}
