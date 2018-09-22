'use strict'

const restify = require('restify');
const Logger = require('./../logger')

const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Auth', CONFIG)

const server = restify.createServer();
server.get('/*', (req, res, next) => {
  res.send('Hello from auth service')
  next()
});

module.exports = {
    name: 'Auth',
    mock: false,
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
