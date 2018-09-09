import React from 'react';
import Link from 'next/link';
import GoogleAuth from './component/google-auth';
import PocketAuth, { testPocketAuth } from './component/pocket-auth';
import { retrieveState, updateState } from './utils/persistence';

export default class Home extends React.Component {
  static async getInitialProps({
    pathname,
    asPath,
    jsonPageRes,
    req,
    res,
    err
  }) {
    console.log(pathname, asPath, jsonPageRes, res, err, req);
    // const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    // return { userAgent };
    return { test: 'test' };
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      // google data
      isGoogleLoggedIn: false,
      // _id: null,
      // googleExpiryDate: null,
      googleEmail: '',
      // pocket data
      isPocketLoggedIn: false,
      pocketRequestId: null,
      // pocketUserId: '',
      pocketUsername: ''
    };
    this.onGoogleLogin = this.onGoogleLogin.bind(this);
    this.onGoogleLogout = this.onGoogleLogout.bind(this);
    this.onPocketRequestAuth = this.onPocketRequestAuth.bind(this);
    this.onPocketLogin = this.onPocketLogin.bind(this);
    this.onPocketLogout = this.onPocketLogout.bind(this);
    this.onError = this.onError.bind(this);
    this.hydrate();
    console.log(props);
  }

  onGoogleLogin({ _id, email, expiryDate }) {
    // console.log(_id, email, new Date(expiryDate));
    const stateUpdate = {
      _id,
      isGoogleLoggedIn: true,
      googleEmail: email,
      googleExpiryDate: expiryDate
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  }

  onGoogleLogout() {
    const stateUpdate = {
      _id: null,
      isGoogleLoggedIn: false,
      googleEmail: null,
      googleExpiryDate: null
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  }

  onPocketRequestAuth(pocketRequestId) {
    const stateUpdate = { pocketRequestId };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  }

  onPocketLogin({ _id, username }) {
    const stateUpdate = {
      pocketRequestId: null,
      pocketUserId: _id,
      pocketUsername: username,
      isPocketLoggedIn: true
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  }

  onPocketLogout() {
    // console.log('pocket logout');
    const stateUpdate = {
      pocketUserId: null,
      pocketUsername: null,
      isPocketLoggedIn: false
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  }

  onError({ error }) {
    this.setState({ error });
  }

  hydrate() {
    retrieveState()
      .then((state) => this.setState(state))
      .then(() => {
        const { pocketRequestId } = this.state;
        if (!pocketRequestId) {
          return;
        }
        testPocketAuth(this.onPocketLogin, this.onError)(pocketRequestId);
      });
  }

  render() {
    const {
      error,
      googleEmail,
      isGoogleLoggedIn,
      isPocketLoggedIn,
      pocketUsername
    } = this.state;
    return (
      <div>
        <h1
          style={{
            boder: '1px solid black',
            padding: '1rem',
            textAlign: 'center'
          }}
        >
          Mail Link Extractor
        </h1>
        <h2>Google Authentication</h2>
        <div className="error">{error}</div>
        <div>
          <GoogleAuth
            isLoggedIn={isGoogleLoggedIn}
            email={googleEmail}
            onLogin={this.onGoogleLogin}
            onLogout={this.onGoogleLogout}
            onError={this.onError}
          />
        </div>
        <h2>Pocket Authentication</h2>
        <PocketAuth
          isLoggedIn={isPocketLoggedIn}
          username={pocketUsername}
          onAuth={this.onPocketRequestAuth}
          onLogin={this.onPocketLogin}
          onLogout={this.onPocketLogout}
          onError={this.onError}
        />
        <h2>Things to execute on mails</h2>
        <Link href="/session">
          <a href="/session">Session Test</a>
        </Link>
        <div />
      </div>
    );
  }
}
