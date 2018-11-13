export const clientId = process.env.GOOGLE_CLIENT_ID;
export const scopes = (process.env.GOOGLE_SCOPES || '')
  .split(',')
  .map((scope) => `${process.env.GOOGLE_SCOPE_ORIGIN}${scope}`)
  .join(' ');

export const ACTIONS = {
  GOOGLE_AUTH_LOGIN: 'GOOGLE_AUTH_LOGIN',
  GOOGLE_AUTH_LOGOUT: 'GOOGLE_AUTH_LOGOUT',
  GOOGLE_AUTH_ERROR: 'GOOGLE_AUTH_ERROR',
};
