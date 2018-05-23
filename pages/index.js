import GoogleAuth from './component/google-auth';
import PocketAuth, { testPocketAuth } from './component/pocket-auth';
import Link from 'next/link';
import { retrieveState, updateState } from '../utils/persistence';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      // google data
      isGoogleLoggedIn: false,
      _id: null,
      googleExpiryDate: null,
      googleEmail: '',
      // pocket data
      isPocketLoggedIn: false,
      pocketRequestId: null,
      pocketUserId: '',
      pocketUsername: ''
    };
    retrieveState()
      .then((state) => this.setState(state))
      .then(
        () =>
          this.state.pocketRequestId
            ? testPocketAuth(this.onPocketLogin, this.onError)(
                this.state.pocketRequestId
              )
            : undefined
      );
  }

  onGoogleLogin = ({ _id, email, expiryDate }) => {
    console.log(_id, email, new Date(expiryDate));
    const stateUpdate = {
      _id,
      isGoogleLoggedIn: true,
      googleEmail: email,
      googleExpiryDate: expiryDate
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  };

  onGoogleLogout = (data) => {
    console.log(data);
    const stateUpdate = {
      _id: null,
      isGoogleLoggedIn: false,
      googleEmail: null,
      googleExpiryDate: null
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  };

  onPocketRequestAuth = (pocketRequestId) => {
    const stateUpdate = { pocketRequestId };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  };

  onPocketLogin = ({ _id, username }) => {
    const stateUpdate = {
      pocketRequestId: null,
      pocketUserId: _id,
      pocketUsername: username,
      isPocketLoggedIn: true
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  };

  onPocketLogout = () => {
    console.log('pocket logout');
    const stateUpdate = {
      pocketUserId: null,
      pocketUsername: null,
      isPocketLoggedIn: false
    };
    this.setState(stateUpdate, () => updateState(stateUpdate));
  };

  onError = ({ error, details }) => {
    console.log(error, details);
    this.setState({ error });
  };

  render() {
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
        <div className="error">{this.state.error}</div>
        <div>
          <GoogleAuth
            isLoggedIn={this.state.isGoogleLoggedIn}
            email={this.state.googleEmail}
            onLogin={this.onGoogleLogin}
            onLogout={this.onGoogleLogout}
            onError={this.onError}
          />
        </div>
        <h2>Pocket Authentication</h2>
        <PocketAuth
          isLoggedIn={this.state.isPocketLoggedIn}
          username={this.state.pocketUsername}
          onAuth={this.onPocketRequestAuth}
          onLogin={this.onPocketLogin}
          onLogout={this.onPocketLogout}
          onError={this.onError}
        />
        <h2>Things to execute on mails</h2>
        <Link href="/session">
          <a>Session Test</a>
        </Link>
        <div />
      </div>
    );
  }
}
