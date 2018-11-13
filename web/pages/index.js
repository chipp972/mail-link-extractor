import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import GoogleAuth from '../components/google-auth';
import Head from '../components/head';
import { Title } from '../components/title';

const Home = ({ error }) => (
  <div>
    <Head title="Home" />
    <Title />
    <h2>Google Authentication</h2>
    <div className="error">{error}</div>
    <div>
      <GoogleAuth />
    </div>
    <h2>Things to execute on mails</h2>
    <Link href="/session">
      <a href="/session">Session Test</a>
    </Link>
    <div />
  </div>
);

Home.defaultProps = { error: null };

Home.propTypes = {
  error: PropTypes.string,
};

const mapStateToProps = ({ googleAuth }) => {
  const error = googleAuth.error || null;
  return {
    error,
  };
};

export default connect(mapStateToProps)(Home);
