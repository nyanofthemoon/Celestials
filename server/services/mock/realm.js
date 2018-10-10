'use strict'

const path = require('path')
const jsonServer = require('json-server')
const validator = require('restify-joi-middleware')

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Realm (Mock)', CONFIG)

var validation = require('./../../validation').validate

const server = jsonServer.create(CONFIG.service.realm.options)
server.use(validator())

const router = jsonServer.router(path.join(__dirname, 'schema/realm.json'))
const middlewares = jsonServer.defaults({
  logger: false,
  bodyParser: true,
  noCors: false,
  readOnly: false
})
server.use(middlewares)

server.use(jsonServer.rewriter({
  '/api/*': '/$1'
}))

server.get('/realm/status', (req, res, next) => {
  res.send({});
  next()
})

server.post('/realm/tax', (req, res, next) => {

  res.send({});
  next()
})

server.use(jsonServer.bodyParser)
server.use(router)

module.exports = {
    name: 'Realm (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.realm.port
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
