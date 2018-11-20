'use strict'

const restify = require('restify')
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const CONFIG = require('./../config')
const logger = new CONFIG.environment.logger('SERVICE Warfare', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.warfare.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/warfare/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': false,
    'version': '1.0.0'
  })
})

server.post('/api/warfare', (req, res, next) => {
  return res.send('@TODO')
})

server.get('/api/warfare', (req, res, next) => {
  return res.send('@TODO')
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/warfare/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Wafare',
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
