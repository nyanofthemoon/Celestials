'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Market (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.market.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/market/status', (req, res, next) => {
  return res.send('OK')
});

let DATA = {
  "food": {
    "stock": 4250,
    "value": 1
  },
  "gold": {
    "stock": 250,
    "value": 20
  },
  "wood": {
    "stock": 125,
    "value": 40
  },
  "brick": {
    "stock": 85,
    "value": 50
  },
  "ore": {
    "stock": 50,
    "value": 100
  },
  "glass": {
    "stock": 25,
    "value": 200
  }
}

server.post('/api/market', (req, res, next) => {
  // of_amount   50
  // of_type  gold
  // for_type wood
  return res.send({
    'status': 'success',
    'data': {
      'of_amount': 50,
      'of_type': 'gold',
      'for_amount': 25,
      'for_type': 'wood'
    }
  })
})

server.get('/api/market', (req, res, next) => {
  return res.send(DATA)
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/market/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Market (Mock)',
    mock: true,
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
