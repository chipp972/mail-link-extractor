import { getExpressRegistry } from 'express-registry';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

export default function initGoogleServices(): OAuth2Client {
  const registry = getExpressRegistry<Config, Lib, Services>();
  const { env } = registry.getConfig();

  const oauth2client = new google.auth.OAuth2(
    env.google.auth.clientId,
    env.google.auth.clientSecret,
    env.google.auth.redirectUrl,
  );

  return oauth2client;
}
