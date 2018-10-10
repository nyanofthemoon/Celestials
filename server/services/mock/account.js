'use strict'

const path = require('path')
const jsonServer = require('json-server')

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Account (Mock)', CONFIG)

const server = jsonServer.create(CONFIG.service.account.options)
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

server.get('/account/status', (req, res, next) => {
  res.send({
    'status': 'success',
    'data': {}
  })
  next()
})

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
