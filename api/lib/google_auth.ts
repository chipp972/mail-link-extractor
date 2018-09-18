import { injectRegistry } from 'singleton-module-registry';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

type OAuth2ClientFactory = (
  clientId: string,
  clientSecret: string,
  redirectUrl: string
) => OAuth2Client;

interface Props {
  clientId: string;
  clientSecret: string;
  redirectUrl: string;
  oauth2ClientFactory: OAuth2ClientFactory;
}

export function initGoogleAuth({ clientId, clientSecret, redirectUrl, oauth2ClientFactory }: Props): OAuth2Client {
  return new oauth2ClientFactory(
    clientId,
    clientSecret,
    redirectUrl
  );
}

export default injectRegistry((registry) => ({
    clientId: registry.env.google.auth.clientId,
    clientSecret: registry.env.google.auth.clientSecret,
    redirectUrl: registry.env.google.auth.redirectUrl,
  oauth2ClientFactory: google.auth.OAuth2,
}))(initGoogleAuth);
