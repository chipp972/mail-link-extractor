import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

interface Props {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
}

export function initGoogleAuth({ clientId, clientSecret, redirectUrl }: Props): OAuth2Client {
  const oauth2Client: OAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUrl);
  return oauth2Client;
}

export default initGoogleAuth;
