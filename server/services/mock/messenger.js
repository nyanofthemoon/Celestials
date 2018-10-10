'use strict'

const restify = require('restify');
const errors = require('restify-errors');

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Messenger (Mock)', CONFIG)

const server = restify.createServer();
server.get('/*', (req, res, next) => {
  logger.warning('get /* ')
  return next(new errors.NotFoundError('404'))
});

server.get('/api/messenger/status', (req, res, next) => {
  res.send({});
  next()
});

server.get('/api/messenger', (req, res, next) => {
  res.send({
    'messages': []
  });
  next()
});

server.post('/api/messenger', (req, res, next) => {
  res.send({});
  next()
});

module.exports = {
    name: 'Messenger (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.messenger.port
      server.listen(port, () => {
        logger.success(`Listening on port ${port}`)
      });
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    },
}
