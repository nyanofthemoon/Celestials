'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger = new Logger('SERVICE Account', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.account.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/account/status', (req, res, next) => {
  return res.send('OK')
})

server.post({ path: '/api/account', validation: validation.account }, (req, res, next) => {
  next()
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/account/status', methods: ['GET'] }
  ]
}))

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
