import PropTypes from 'prop-types';
import React from 'react';
import { apiGet, apiPost } from '../lib/ajax';

export const testPocketAuth = (successCb, errorCb) => (pocketRequestId) => {
  apiGet(`/api/pocket/user-from-request/${pocketRequestId}`)
    .then((raw) => raw.json())
    .then(({ success, data }) => (success ? successCb(data) : data))
    .catch((err) => errorCb(err));
};

const pocketAuthRedirect = (successCallback, errorCallback) => (e) => {
  e.preventDefault();
  apiGet('/api/pocket/authorize-url')
    .then((raw) => raw.json())
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
  apiPost({
    url: '/api/pocket/logout',
    body: { data: 'test' },
  })
    .then(onLogout)
    .catch(onError);
};

const pocketAuth = ({ isLoggedIn, username, onAuth, onLogout, onError }) =>
  isLoggedIn ? (
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
  onLogout: (arg) => console.log(arg),
  onError: (err) => console.log(err),
};

pocketAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  username: PropTypes.string.isRequired,
  onAuth: PropTypes.func.isRequired,
  onError: PropTypes.func,
  onLogout: PropTypes.func,
};

export default pocketAuth;
