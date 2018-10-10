'use strict'

const restify = require('restify');
const Logger = require('./../logger')

const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Messenger', CONFIG)

const server = restify.createServer();

server.get('/api/messenger/status', (req, res, next) => {
  res.send('HELO')
  next()
});

server.post('/api/messenger', (req, res, next) => {
  res.send('@TODO')
  next()
});

module.exports = {
    name: 'Messenger',
    mock: false,
    start: () => {
      const port = CONFIG.service.messenger.port
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
