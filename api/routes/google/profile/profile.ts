import { getExpressRegistry } from 'express-registry';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { google, oauth2_v2 } from 'googleapis';

export async function getUserInfos(credentials: Credentials) {
  try {
    const registry = getExpressRegistry<Config, Lib, Services>();
    const { googleAuth } = registry.getServices();
    googleAuth.setCredentials(credentials);

    const oauth2: oauth2_v2.Oauth2 = google.oauth2({
      version: 'v2',
      auth: googleAuth,
    });
    const res = await oauth2.userinfo.get();
    return res.data;
  } catch (err) {
    throw err;
  }
}
