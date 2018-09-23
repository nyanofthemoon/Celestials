'use strict'

const restify = require('restify');
const errors = require('restify-errors');

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Auth (Mock)', CONFIG)

const server = restify.createServer();
server.get('/*', (req, res, next) => {
  logger.warning('get /* ')
  return next(new errors.NotFoundError('404'))
});
server.post('/api/auth', (req, res, next) => {
  res.send({ hello: 'world' });
  next()
});

module.exports = {
    name: 'Auth (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.auth.port
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
