import { Env } from './typedef';

const env: Env = {
  database: {
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost/test',
    mongoPoolSize: parseInt(process.env.MONGO_POOL_SIZE || '5', 10),
  },
  express: {
    sessionSecret: process.env.EXPRESS_SESSION_SECRET || 'pocket-test-app',
  },
  google: {
    auth: {
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      redirectUrl: process.env.GOOGLE_REDIRECT_URL || 'postmessage',
      tokenRevokationUrl: process.env.GOOGLE_REVOKATION_URL || 'https://accounts.google.com/o/oauth2/revoke',
      tokenUrl: process.env.GOOGLE_TOKEN_URL || 'https://www.googleapis.com/oauth2/v4/token',
    },
  },
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  pocket: {
    consumer_key: process.env.POCKET_CONSUMER_KEY || '',
    redirect_uri: process.env.POCKET_REDIRECT_URL || '',
  },
  port: parseInt(process.env.PORT || '5000', 10),
  apiOrigin: process.env.API_ORIGIN || 'http://localhost:5000',
  devFrontOrigin: process.env.DEV_FRONT_ORIGIN || 'http://localhost:3000',
  logger: {
    level: process.env.LOG_LEVEL || 'info',
    isJSONFormat: process.env.LOG_IS_JSON !== '0',
    hasColor: process.env.LOG_HAS_COLOR === '1',
  },
};

export default env;
