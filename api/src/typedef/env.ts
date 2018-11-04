export interface Env {
  database: {
    mongodbUri: string;
    mongoPoolSize: number;
  };
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
  port: number;
  apiOrigin: string;
  devFrontOrigin: string;
}
