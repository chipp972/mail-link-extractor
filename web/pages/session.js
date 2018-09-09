import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

class SessionTest extends React.Component {
  constructor(props) {
    super(props);
    const { result } = props;
    this.state = { result };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData() {
    try {
      const raw = await fetch('http://localhost:5000/session/test', {
        method: 'GET',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
        },
      });
      const result = await raw.json();
      this.setState({ result });
    } catch (error) {
      this.setState({ error });
    }
  }

  render() {
    const { result, error } = this.state;
    console.log(result);
    return (
      <div>
        <h1>Pocket test</h1>
        <Link href="/index">
          <a href="/index">Back to index</a>
        </Link>
        {error ? <div className="error">{error.message}</div> : ''}

        <button type="button" onClick={this.fetchData}>
          refresh
        </button>
      </div>
    );
  }
}

SessionTest.defaultProps = {
  result: { success: false },
};

SessionTest.propTypes = {
  result: PropTypes.shape({
    success: PropTypes.bool,
    data: PropTypes.string,
  }),
};

export default SessionTest;
