export interface Env {
  database: {
    mongodbUri: string;
    mongoPoolSize: number;
  };
  isDebug: boolean;
  express: {
    sessionSecret: string;
  };
  google: {
    auth: {
      clientId?: string;
      clientSecret?: string;
      redirectUrl?: string;
      tokenUrl: string;
    };
  };
  isProd: boolean;
  isDev: boolean;
  pocket: {
    consumer_key: string;
    redirect_uri: string;
  };
  port: number;
}

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
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      clientId: process.env.GOOGLE_CLIENT_ID,
      redirectUrl: process.env.GOOGLE_REDIRECT_URL || '',
      tokenUrl: process.env.GOOGLE_TOKEN_URL || 'https://www.googleapis.com/oauth2/v4/token',
    },
  },
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'development',
  isDebug: process.env.DEBUG === '1' || false,
  pocket: {
    consumer_key: process.env.POCKET_CONSUMER_KEY || '',
    redirect_uri: process.env.POCKET_REDIRECT_URL || '',
  },
  port: parseInt(process.env.PORT || '5000', 10),
};

export default env;
