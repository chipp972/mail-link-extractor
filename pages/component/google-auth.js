import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import fetch from 'isomorphic-unfetch';

const clientId =
  '859423039820-u47j4gvndea3pn0v8hp8met8veljgfcb.apps.googleusercontent.com';

const scopes = [
  'https://www.googleapis.com/auth/gmail.labels',
  'https://www.googleapis.com/auth/gmail.modify',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

const onSuccess = (successCallback, errorCallback) => ({ code }) => {
  fetch('/api/google/sendcode', {
    method: 'POST',
    // Always include an `X-Requested-With` header in every AJAX request,
    // to protect against CSRF attacks.
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  })
    .then((raw) => raw.json())
    .then(({ success, data }) => successCallback(data))
    .catch((err) => errorCallback(err));
};

export default ({ isLoggedIn, email, onLogin, onLogout, onError }) =>
  isLoggedIn ? (
    <div>
      <p>Email: {email}</p>
      <GoogleLogout
        buttonText="Logout"
        onLogoutSuccess={onLogout}
        disabledStyle={true}
      />
    </div>
  ) : (
    <GoogleLogin
      clientId={clientId}
      responseType="code"
      accessType="offline"
      scope={scopes.join(' ')}
      buttonText="Login"
      onSuccess={onSuccess(onLogin, onError)}
      onFailure={onError}
    />
  );
