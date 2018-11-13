import { ACTIONS } from './constant';
import { apiPost, urls } from '../../lib/ajax';

export const googleAuthLogin = (data) => ({
  type: ACTIONS.GOOGLE_AUTH_LOGIN,
  data,
});

export const googleAuthLogout = () => ({ type: ACTIONS.GOOGLE_AUTH_LOGOUT });

export const googleAuthError = (err) => ({
  type: ACTIONS.GOOGLE_AUTH_ERROR,
  data: err,
});

export const postGoogleCode = ({ code }) => async (dispatch) => {
  try {
    const response = await apiPost({
      url: urls.google.sendCode,
      body: { code },
    });
    const { success, data, error } = await response.json();
    return success ? dispatch(googleAuthLogin(data)) : dispatch(googleAuthError(error));
  } catch (err) {
    return dispatch(googleAuthError(err));
  }
};
