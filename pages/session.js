import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

export default class SessionTest extends React.Component {
  fetchData() {
    return fetch('/session/test', {
      method: 'GET',
      // Always include an `X-Requested-With` header in every AJAX request,
      // to protect against CSRF attacks.
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
      .then((raw) => raw.json())
      .then((result) => console.log(JSON.stringify(result)))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h1>Pocket test</h1>
        <Link href="/index">
          <a>Back to index</a>
        </Link>
        <button onClick={this.fetchData}>click here</button>
      </div>
    );
  }
}
