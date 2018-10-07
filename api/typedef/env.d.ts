import { OAuth2Client } from 'google-auth-library';

declare global {
  interface Env {
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
        clientId: string;
        clientSecret: string;
        redirectUrl: string;
        tokenRevokationUrl: string;
        tokenUrl: string;
      };
    };
    isProd: boolean;
    isDev: boolean;
    pocket: {
      consumer_key: string;
      redirect_uri: string;
    };
    hostname: string;
    port: number;
  }
}
