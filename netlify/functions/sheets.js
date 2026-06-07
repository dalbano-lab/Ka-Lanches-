const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzjRyOeMav-NVnI34flqXWYQVSs8oqfy7H1be-VU4hGWlheglbu5TMZ9gWK0rklV8_bMw/exec';

exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'POST') {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: event.body
      });
      const text = await res.text();
      return { statusCode: 200, headers, body: text };
    }

    if (event.httpMethod === 'GET') {
      const params = event.queryStringParameters || {};
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${SCRIPT_URL}?${query}`);
      const text = await res.text();
      return { statusCode: 200, headers, body: text };
    }
  } catch(err) {
    return { statusCode: 500, headers, body: JSON.stringify({ok: false, error: err.message}) };
  }
};
