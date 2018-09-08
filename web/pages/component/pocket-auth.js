import PropTypes from 'prop-types';
import React from 'react';
import fetch from 'isomorphic-unfetch';

export const testPocketAuth = (successCb, errorCb) => (pocketRequestId) => {
  fetch(`/api/pocket/user-from-request/${pocketRequestId}`, {
    method: 'GET',
    // Always include an `X-Requested-With` header in every AJAX request,
    // to protect against CSRF attacks.
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  })
    .then(raw => raw.json())
    .then(({ success, data }) => (success ? successCb(data) : data))
    .catch(err => errorCb(err));
};

const pocketAuthRedirect = (successCallback, errorCallback) => (e) => {
  e.preventDefault();
  fetch('http://localhost:5000/api/pocket/authorize-url', {
    method: 'GET',
    // Always include an `X-Requested-With` header in every AJAX request,
    // to protect against CSRF attacks.
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
  })
    .then(raw => raw.json())
    .then(({ success, data }) => {
      if (!success) {
        throw data;
      }
      successCallback(data.pocketRequestId);
      return data.url;
    })
    .then((url) => {
      window.location.href = url;
    })
    .catch((err) => {
      errorCallback(err);
    });
};

const logout = (onLogout, onError) => (e) => {
  e.preventDefault();
  fetch('http://localhost:5000/api/pocket/logout', {
    method: 'POST',
    // Always include an `X-Requested-With` header in every AJAX request,
    // to protect against CSRF attacks.
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: 'gh' }),
  })
    .then(onLogout)
    .catch(onError);
};

const pocketAuth = ({
  isLoggedIn, username, onAuth, onLogout, onError,
}) => isLoggedIn ? (
  <div>
    <p>{`username: ${username}`}</p>
    <button type="button" onClick={logout(onLogout, onError)}>
        Logout
    </button>
  </div>
) : (
  <button type="button" onClick={pocketAuthRedirect(onAuth, onError)}>
      Login
  </button>
);

pocketAuth.defaultProps = {
  onLogout: arg => console.log(arg),
  onError: err => console.log(err),
};

pocketAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onLogout: PropTypes.func,
};

export default pocketAuth;
