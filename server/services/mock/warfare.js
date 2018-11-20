'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const CONFIG = require('./../../config')
const logger = new CONFIG.environment.logger('SERVICE Warfare (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.warfare.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/warfare/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
})

server.get('/api/warfare', (req, res, next) => {
  return res.send({})
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/warfare/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Warfare (Mock)',
    mock: false,
    start: () => {
      const port = CONFIG.service.warfare.port
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
