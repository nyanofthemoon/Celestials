'use strict'

const restify = require('restify')
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')

const Logger = require('./../logger')
const CONFIG = require('./../config')
const logger  = new Logger('SERVICE Politics', CONFIG)
const validation = require('./../validation').validate

const server = restify.createServer(CONFIG.service.politics.options);
server.use(restify.plugins.acceptParser(server.acceptable))
server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser({mapParams: false}))
server.use(restify.plugins.gzipResponse())
server.use(validator())

server.get('/api/politics/status', (req, res, next) => {
  return res.send('OK')
})

server.post('/api/politics', (req, res, next) => {
  return res.send('@TODO')
})

server.get('/api/politics', (req, res, next) => {
  return res.send('@TODO')
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/politics/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Politics',
    mock: false,
    start: () => {
      const port = CONFIG.service.poitics.port
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
