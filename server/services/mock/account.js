'use strict'

const path = require('path')
const jsonServer = require('json-server')

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Account', CONFIG)

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'schema/account.json'))
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

server.use(jsonServer.bodyParser)
server.use(router)

module.exports = {
    name: 'Account (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.account.port
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
