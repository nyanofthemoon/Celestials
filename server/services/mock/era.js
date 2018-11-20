'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const CONFIG = require('./../../config')
const logger = new CONFIG.environment.logger('SERVICE Era (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.era.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/era/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
});

const INITIAL = new Date().getTime()

server.get('/api/era/generation', (req, res, next) => {
  return res.send({
    'generation': 1,
    'name': 'Generation Bugs',
    'last': INITIAL,
    'next': (INITIAL + (CONFIG.service.era.generationLength * CONFIG.service.era.lengthInGenerations))
  })
})

server.get('/api/era', (req, res, next) => {
  return res.send({
    'era': 1,
    'name': 'Era of Debugging',
    'status': 'OPEN',
    'generations': CONFIG.service.era.lengthInGenerations,
    'last': INITIAL,
    'next': (INITIAL + CONFIG.service.era.generationLength)
  })
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/era/status', methods: ['GET'] },
    { url: '/api/era/generation', methods: ['GET'] },
    { url: '/api/era', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Era (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.era.port
      server.listen(port, () => {
        logger.success(`Listening on port ${port}`)
      })
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    },
}
