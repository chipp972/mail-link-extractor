import PropTypes from 'prop-types';
import React from 'react';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';
import { postGoogleCode, googleAuthLogout, googleAuthError } from './actions';
import { clientId, scopes } from './constant';

const googleAuth = ({ isLoggedIn, email, profilePicture, onLogin, onLogout, onError }) =>
  isLoggedIn ? (
    <div>
      <p>
        {profilePicture && <img src={profilePicture} alt="profile" />}
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
      onSuccess={onLogin}
      onFailure={onError}
    />
  );

googleAuth.defaultProps = { email: null, profilePicture: null };

googleAuth.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  email: PropTypes.string,
  profilePicture: PropTypes.string,
};

const mapStateToProps = ({ googleAuth: { email, isLoggedIn, profilePicture } }) => ({
  email,
  isLoggedIn,
  profilePicture,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: ({ code }) => dispatch(postGoogleCode({ code })),
  onLogout: () => dispatch(googleAuthLogout()),
  onError: (error) => dispatch(googleAuthError(error)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(googleAuth);
