import env from './env';

describe('env', () => {
  it('should have default values', () => {
    expect(env).toEqual({
      database: {
        mongodbUri: 'mongodb://localhost/test',
        mongoPoolSize: 5,
      },
      express: {
        sessionSecret: 'pocket-test-app',
      },
      google: {
        auth: {
          clientSecret: undefined,
          clientId: undefined,
          redirectUrl: '',
        },
      },
      isProd: false,
      isDev: false,
      isDebug: false,
      pocket: {
        consumer_key: '',
        redirect_uri: '',
      },
      port: 5000,
    });
  });
});
