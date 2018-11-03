import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { google, oauth2_v2 } from 'googleapis';
import { Lib } from '../../typedef';

export async function getProfile(lib: Lib, credentials: Credentials) {
  try {
    lib.googleAuth.setCredentials(credentials);
    const oauth2: oauth2_v2.Oauth2 = google.oauth2({
      version: 'v2',
      auth: lib.googleAuth,
    });
    const res = await oauth2.userinfo.get();
    return res.data;
  } catch (err) {
    lib.logger.error(err.message);
    throw err;
  }
}

export default getProfile;
