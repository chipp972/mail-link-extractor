import { google } from 'googleapis';
import { initGoogleAuth } from './google_auth';

describe('lib google auth', () => {
  it('should create google auth client', () => {
    const spy = jest.spyOn(google.auth, 'OAuth2');
    initGoogleAuth({
      clientId: 'id',
      clientSecret: 'secret',
      redirectUrl: 'url',
    });
    expect(spy).toHaveBeenCalledWith('id', 'secret', 'url');
  });
});
