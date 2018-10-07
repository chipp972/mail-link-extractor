// Check doc on https://developers.google.com/identity/protocols/OAuth2WebServer#offline
import fetch from 'isomorphic-unfetch';
import { RefreshTokenResponse } from './google_account_typedef';

const headers = {
  'Content-type': 'application/x-www-form-urlencoded',
};

/**
 * Acquire an access token for the first time
 */
export const getAccessToken = async (lib: Lib, code: string) => {
  try {
    return await lib.googleAuth.getToken(code);
  } catch (err) {
    lib.logger.error(err);
    throw err;
  }
};

/**
 * refresh an access token
 */
export const refresh = async (env: Env, lib: Lib, refreshToken: string): Promise<RefreshTokenResponse> => {
  try {
    const res = await fetch(env.google.auth.tokenUrl, {
      headers,
      body: JSON.stringify({
        client_id: env.google.auth.clientId,
        client_secret: env.google.auth.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }),
    });
    if (res.ok) {
      return await res.json();
    }
    throw new Error('Token refresh failed');
  } catch (err) {
    lib.logger.error(err);
    throw err;
  }
};

/**
 * Revoke an access token or refresh token
 * @param token Access token or Refresh token to revoke access
 */
export const revoke = (env: Env, token: string): Promise<string> =>
  fetch(`${env.google.auth.tokenRevokationUrl}?token=${token}`, {
    headers,
  })
    .then(({ ok, body }) => {
      if (!ok) {
        return body;
      }
      return ok;
    })
    .catch((err) => err);
