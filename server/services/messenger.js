'use strict'

const restify = require('restify')
const jwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Messenger', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.messenger.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/messenger/status', (req, res, next) => {
  res.send('HELO')
  next()
})

server.post('/api/messenger', (req, res, next) => {
  res.send('@TODO')
  next()
})

server.use(jwt({ secret: CONFIG.service.auth.secret }).unless({
  path: [
    { url: '/api/messenger/status', methods: ['GET'] }
  ]
}))

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
