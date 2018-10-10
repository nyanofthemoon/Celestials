'use strict';

const CONFIG = require('./config');

function formatJSend(req, res, body) {
  function formatError(res, body) {
    const isError = res.statusCode >= 400 && res.statusCode < 500;
    if (isError) {
      return {
        status: 'error',
        message: body.message,
        code: body.code
      };
    } else {
      const inDevMode = CONFIG.environment.isDev();
      return {
        status: 'error',
        message: inDevMode ? body.message : 'Internal Server Error',
        code: inDevMode ? body.code : 'INTERNAL_SERVER_ERROR',
        data: inDevMode ? body.stack : undefined
      };
    }
  }

  function formatSuccess(res, body) {
    if (body.data && body.pagination) {
      return {
        status: 'success',
        data: body.data,
        pagination: body.pagination,
      };
    }

    return {
      status: 'success',
      data: body
    };
  }

  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }

  response = JSON.stringify(response);
  res.header('Content-Length', Buffer.byteLength(response));
  res.header('Content-Type', 'application/json');

  return response;
}

module.exports = formatJSend;
