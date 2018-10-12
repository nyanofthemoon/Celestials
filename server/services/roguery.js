'use strict'

const restify = require('restify')
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Roguery', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.roguery.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/roguery/status', (req, res, next) => {
  return res.send('OK')
})

server.get('/api/roguery', (req, res, next) => {
  return res.send('@TODO')
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/roguery/status', methods: ['GET'] },
    { url: '/api/roguery', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Roguery',
    mock: false,
    start: () => {
      const port = CONFIG.service.roguery.port
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
