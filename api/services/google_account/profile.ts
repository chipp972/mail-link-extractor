import { OAuth2Client } from 'google-auth-library';
import { Credentials } from 'google-auth-library/build/src/auth/credentials';
import { google, oauth2_v2 } from 'googleapis';
import { injectRegistry } from 'singleton-module-registry';
import { Logger } from 'winston';

interface Props {
  oauth2Client: OAuth2Client;
  logger: Logger;
}

export function getProfile({ oauth2Client, logger }: Props) {
  return async (credentials: Credentials) => {
    try {
      oauth2Client.setCredentials(credentials);
      const oauth2: oauth2_v2.Oauth2 = google.oauth2({
        version: 'v2',
        auth: oauth2Client,
      });
      const res = await oauth2.userinfo.get();
      return res.data;
    } catch (err) {
      logger.error(err.message);
      throw err;
    }
  };
}

export const getProfileWithRegistry = injectRegistry<any, any, any>((registry) => ({
  oauth2Client: registry.googleAuth,
  logger: registry.logger,
}))(getProfile)();
