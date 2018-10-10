'use strict'

const restify = require('restify')
const jwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Realm', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.realm.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/realm/status', (req, res, next) => {
  res.send('HELO')
  next()
})

server.post('/api/realm', (req, res, next) => {
  res.send('@TODO')
  next()
})

server.use(jwt({ secret: CONFIG.service.auth.secret }).unless({
  path: [
    { url: '/api/realm/status', methods: ['GET'] }
  ]
}))

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
