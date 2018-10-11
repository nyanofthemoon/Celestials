'use strict'

const restify = require('restify')
const jwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Auth', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.auth.options)
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/auth/status', (req, res, next) => {
  res.send('OK')
  next()
})

server.post({ path:'/api/auth', validation: validation.auth }, (req, res, next) => {
  res.send('@TODO')
  next()
})

server.use(jwt({ secret: CONFIG.service.auth.secret }).unless({
  path: [
    { url: '/api/auth/status', methods: ['GET'] },
    { url: '/api/auth', methods: ['POST'] }
  ]
}))

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
