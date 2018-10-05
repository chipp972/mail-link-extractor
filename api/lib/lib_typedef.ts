import { Logger } from 'winston';
import { Connection } from 'mongoose';
import { OAuth2Client } from 'google-auth-library';

export interface Lib {
  logger: Logger;
  db: Connection;
  googleAuth: OAuth2Client;
}
