// eslint-disable-next-line import/prefer-default-export
export const fnprivate = (event, context, cb) => {
  const p = new Promise(resolve => {
    resolve('success');
  });
  const response = {
    statusCode: 200,
    // Ref: https://serverless.com/blog/cors-api-gateway-survival-guide/
    // Tal vez usar  https://middy.js.org/ simplifica esto
    headers: {
      "Access-Control-Allow-Origin" : "http://localhost", // Required for CORS support to work
      "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    },
    body: JSON.stringify(
      {
        message: 'Private endpoint. You are in!!',
        input: event,
      },
      null,
      2
    ),
  };
  p.then(() => cb(null, response)).catch(e => cb(e));
};

export const fnpublic = (event, context, cb) => {
  const p = new Promise(resolve => {
    resolve('success');
  });
  const response = {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Public endpoint. Nothing new...',
        input: event,
      },
      null,
      2
    ),
  };
  p.then(() => cb(null, response)).catch(e => cb(e));
};
