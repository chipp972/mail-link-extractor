import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { injectRegistry } from 'singleton-module-registry';

type OAuth2ClientFactory = (clientId: string, clientSecret: string, redirectUrl: string) => void;

interface Props {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  oauth2ClientFactory: OAuth2ClientFactory;
}

export function initGoogleAuth({ clientId, clientSecret, redirectUrl, oauth2ClientFactory }: Props): OAuth2Client {
  const oauth2Client: OAuth2Client = new oauth2ClientFactory(clientId, clientSecret, redirectUrl);
  return oauth2Client;
}

export default injectRegistry<any, any, any>((registry) => ({
  clientId: registry.env.google.auth.clientId,
  clientSecret: registry.env.google.auth.clientSecret,
  redirectUrl: registry.env.google.auth.redirectUrl,
  oauth2ClientFactory: google.auth.OAuth2,
}))(initGoogleAuth);
