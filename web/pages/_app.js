import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { makeStore } from '../lib/store';

class MailLinkExtractor extends App {
  static async getInitialProps({ Component, ctx }) {
    // TODO: rehydrate store if undefined
    ctx.store.dispatch({ type: 'FOO', payload: 'foo' });
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(makeStore, { debug: process.env.NODE_ENV !== 'production' })(
  MailLinkExtractor
);
