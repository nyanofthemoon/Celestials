'use strict'

const restify = require('restify');
const Logger = require('./../logger')

const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Account', CONFIG)

const server = restify.createServer();
server.get('/*', (req, res, next) => {
  res.send('Hello from account service')
  next()
});

module.exports = {
    name: 'Account',
    mock: false,
    start: () => {
      const port = CONFIG.service.account.port
      server.listen(port, () => {
        logger.success(`Started listening on port ${port}`)
      });
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    },
}
