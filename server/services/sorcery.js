'use strict'

const restify = require('restify')
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Sorcery', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.sorcery.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/sorcery/status', (req, res, next) => {
  return res.send('OK')
})

server.get('/api/sorcery', (req, res, next) => {
  return res.send('@TODO')
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/sorcery/status', methods: ['GET'] },
    { url: '/api/sorcery', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Sorcery',
    mock: false,
    start: () => {
      const port = CONFIG.service.sorcery.port
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
