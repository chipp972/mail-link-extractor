// Check doc on https://developers.google.com/identity/protocols/OAuth2WebServer#offline
import fetch from 'isomorphic-unfetch';
import { AccessTokenProps, RefreshTokenProps, RefreshTokenResponse } from './google_account_typedef';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded',
};

/**
 * Acquire an access token for the first time
 */
export const getAccessToken = async ({ code, oauth2Client }: AccessTokenProps) => await oauth2Client.getToken(code);

/**
 * refresh an access token
 */
export const refreshAccessToken = ({
  tokenUrl,
  refreshToken,
  clientSecret,
  clientId,
}: RefreshTokenProps): Promise<RefreshTokenResponse> =>
  fetch(tokenUrl, {
    headers,
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
    .then((res) => res.ok && res.json())
    .catch((err) => err);

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
