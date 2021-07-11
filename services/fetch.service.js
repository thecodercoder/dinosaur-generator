const fetch = require('node-fetch');

// this too can be migrated to a service...
async function fetchWrapper(url, body, method, headers) {
  try {
    const fetchApi = await fetch(
      url,
      {
        method,
        body,
        headers,
      }
    );
    const response = await fetchApi.json();
    if (!response) throw new Error({ message: 'unexpected error', response })
    return [response, null]
  } catch (error) {
    return [null, error]
  }
}

function objToQueryParamString(queryParams) {
  return Object.entries(queryParams).map(([key, val]) => `${key}=${val}`).join('&');
}

module.exports = {
  fetchWrapper,
  objToQueryParamString
}