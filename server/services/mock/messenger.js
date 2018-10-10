'use strict'

const restify = require('restify');
const validator = require('restify-joi-middleware')

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Messenger (Mock)', CONFIG)

var validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.messenger.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/messenger/status', (req, res, next) => {
  res.send({});
  next()
})

server.get('/api/messenger', (req, res, next) => {
  res.send({
    'messages': []
  });
  next()
})

server.post('/api/messenger', (req, res, next) => {
  res.send({});
  next()
})

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
