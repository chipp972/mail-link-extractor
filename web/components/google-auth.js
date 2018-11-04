import PropTypes from 'prop-types';
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { apiPost } from '../lib/ajax';

const clientId = process.env.GOOGLE_CLIENT_ID;
const scopes = (process.env.GOOGLE_SCOPES || '')
  .split(',')
  .map((scope) => `${process.env.GOOGLE_SCOPE_ORIGIN}${scope}`)
  .join(' ');

const onSuccess = (successCallback, errorCallback) => ({ code }) => {
  console.log(code);
  apiPost({
    url: '/api/google/sendcode',
    body: { code },
  })
    .then((raw) => raw.json())
    .then(({ success, data }) => (success ? successCallback(data) : data))
    .catch((err) => errorCallback(err));
};

const googleAuth = ({ isLoggedIn, email, onLogin, onLogout, onError }) =>
  isLoggedIn ? (
    <div>
      <p>
        Email:
        {email}
      </p>
      <GoogleLogout buttonText="Logout" onLogoutSuccess={onLogout} disabledStyle />
    </div>
  ) : (
    <GoogleLogin
      clientId={clientId}
      responseType="code"
      accessType="offline"
      scope={scopes}
      buttonText="Login"
      onSuccess={onSuccess(onLogin, onError)}
      onFailure={onError}
    />
  );

googleAuth.defaultProps = {
  onLogout: (arg) => console.table(arg),
  onError: (err) => console.error(err),
};

googleAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func,
  onError: PropTypes.func,
};

export default googleAuth;
