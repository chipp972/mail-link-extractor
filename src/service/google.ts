import { getExpressRegistry } from 'express-registry';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export default function initGoogleServices(): OAuth2Client {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { env } = registry.getConfig();

  const oauth2client = new google.auth.OAuth2(
    env.google.auth.clientId,
    env.google.auth.clientSecret,
    env.google.auth.redirectUrl
  );

  // const GoogleUserModel = registry.getModule('GoogleUser') as GoogleUser;
  // oauth2client.on('tokens', (tokens: Credentials) => {
  //   if (tokens.refresh_token) {
  //     console.log(tokens.refresh_token, '***********');
  //     GoogleUserModel.findOneAndUpdate(
  //       { idToken: tokens.id_token },
  //       { refreshToken: tokens.refresh_token },
  //       { upsert: true }
  //     );
  //   }
  //   GoogleUserModel.findOneAndUpdate(
  //     { idToken: tokens.id_token },
  //     { accessToken: tokens.access_token },
  //     { upsert: true }
  //   );
  //   console.log(tokens.access_token, '*********************8');
  // });

  return oauth2client;
}
