import fetch from 'isomorphic-unfetch';

// Always include an `X-Requested-With` header in every AJAX request,
// to protect against CSRF attacks.
const defaultHeaders = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/json',
};

const defaultMode = process.env.NODE_ENV === 'development' ? 'cors' : 'same-origin';

/**
 * Post data to the API
 * @param {Object} data post request parameters
 * @param {string} data.url url to send to request to
 * @param {Object.<string, string>} data.headers map of additional headers
 * @param {Object} data.body request data to send
 * @returns {Promise<Response>} fetch response
 */
export const apiPost = ({ url, headers = {}, body }) =>
  fetch(`${process.env.API_ORIGIN}${url}`, {
    method: 'POST',
    headers: {
      ...defaultHeaders,
      ...headers,
    },
    mode: defaultMode,
    body: JSON.stringify(body),
  });

/**
 * Make a get request to the API
 * @param {string} url API path
 * @return {Promise<Response>} API repsonse
 */
export const apiGet = (url) =>
  fetch(`${process.env.API_ORIGIN}${url}`, {
    method: 'GET',
    headers: defaultHeaders,
    mode: defaultMode,
  });
