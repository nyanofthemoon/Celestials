'use strict'

const restify = require('restify')
const jwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Market', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.market.options)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/market/status', (req, res, next) => {
  res.send('HELO')
  next()
})

server.post('/api/market', (req, res, next) => {
  res.send('@TODO')
  next()
})

server.use(jwt({ secret: CONFIG.service.auth.secret }).unless({
  path: [
    { url: '/api/market/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Market',
    mock: false,
    start: () => {
      const port = CONFIG.service.market.port
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
