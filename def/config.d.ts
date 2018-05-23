declare interface EnvObject {
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

declare interface Config {
  env: EnvObject;
}
