import { OAuth2Client } from 'google-auth-library';
import { Connection } from 'mongoose';
import { Logger } from 'winston';

declare global {
  interface Lib {
    logger: Logger;
    db: Connection;
    googleAuth: OAuth2Client;
  }
}
