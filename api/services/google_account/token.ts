import { injectRegistry } from 'singleton-module-registry';
// Check doc on https://developers.google.com/identity/protocols/OAuth2WebServer#offline
import fetch from 'isomorphic-unfetch';
import { AccessTokenProps, RefreshTokenProps, RefreshTokenResponse } from './google_account_typedef';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded',
};

/**
 * Acquire an access token for the first time
 */
export const getAccessToken = ({ logger, oauth2Client }: AccessTokenProps) => async (code: string) => {
  try {
    await oauth2Client.getToken(code);
  } catch (err) {
    logger.error(err);
    throw err;
  }
}

export const getAccessTokenWithRegistry = injectRegistry<any, any, any>((registry) => ({
  logger: registry.logger,
  oauth2Client: registry.googleAuth,
}))(getAccessToken)();

/**
 * refresh an access token
 */
export const refreshAccessToken = ({
  tokenUrl,
  clientSecret,
  clientId,
  logger,
}: RefreshTokenProps) => async (refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    const res = await fetch(tokenUrl, {
      headers,
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error('Token refresh failed');
    }
  } catch (err) {
    logger.error(err)
    throw err;
  }
}

export const refreshAccessTokenWithRegistry = injectRegistry<any, any, any>((registry) => ({
  clientSecret: registry.env.google.auth.clientSecret,
  clientId: registry.env.google.auth.clientId,
  tokenUrl: registry.env.google.auth.tokenUrl,
  logger: registry.logger
}))(refreshAccessToken)();

/**
 * Revoke an access token or refresh token
 * @param token Access token or Refresh token to revoke access
 */
export const revokeToken = (token: string): Promise<string> =>
  fetch(`https://accounts.google.com/o/oauth2/revoke?token=${token}`, {
    headers,
  })
    .then(({ ok, body }) => {
      if (!ok) {
        return body;
      }
      return ok;
    })
    .catch((err) => err);
