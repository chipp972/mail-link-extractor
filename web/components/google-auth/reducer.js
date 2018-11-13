import { ACTIONS } from './constant';
import { createReducer } from '../../helpers/redux';

const { GOOGLE_AUTH_LOGIN, GOOGLE_AUTH_LOGOUT, GOOGLE_AUTH_ERROR } = ACTIONS;

const defaultState = {
  email: '',
  isLoggedIn: false,
  authorizationToken: '',
  expiryDate: null,
  error: null,
};

export default createReducer(
  {
    [GOOGLE_AUTH_LOGIN]: (
      state,
      { email, credentials: { access_token, expiry_date }, profile: { picture } }
    ) => ({
      ...state,
      isLoggedIn: true,
      email,
      profilePicture: picture,
      authorizationToken: access_token,
      expiryDate: expiry_date ? new Date(expiry_date) : null,
    }),
    [GOOGLE_AUTH_LOGOUT]: () => defaultState,
    [GOOGLE_AUTH_ERROR]: (state, error) => ({
      ...state,
      error: {
        message: error.message,
      },
    }),
  },
  defaultState
);
