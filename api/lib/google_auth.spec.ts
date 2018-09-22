import { initGoogleAuth } from './google_auth';

describe('lib google auth', () => {
  it('should init google auth with the passed factory', () => {
    const spy = jest.fn(() => ({
      test: 'a',
    }));
    const test = initGoogleAuth({
      clientId: 'id',
      clientSecret: 'secret',
      redirectUrl: 'url',
      oauth2ClientFactory: spy,
    });
    expect(test).toEqual({ test: 'a' });
    expect(spy).toHaveBeenCalledWith('id', 'secret', 'url');
  });
});
