'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Politics (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.politics.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/politics/status', (req, res, next) => {
  return res.send('OK')
})

server.get('/api/politics', (req, res, next) => {
  return res.send({})
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/politics/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Politics (Mock)',
    mock: false,
    start: () => {
      const port = CONFIG.service.politics.port
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
