'use strict'

const restify = require('restify');
const Logger = require('./../logger')

const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Realm', CONFIG)

const server = restify.createServer();

server.get('/api/realm/status', (req, res, next) => {
  res.send('HELO')
  next()
});

server.post('/api/realm', (req, res, next) => {
  res.send('@TODO')
  next()
});

module.exports = {
    name: 'Realm',
    mock: false,
    start: () => {
      const port = CONFIG.service.realm.port
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
