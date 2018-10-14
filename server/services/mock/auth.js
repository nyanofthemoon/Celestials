'use strict'

const restify = require('restify')
const errors = require('restify-errors')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const jwt = require('jsonwebtoken')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Auth (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.auth.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/auth/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
})

server.post('/api/auth', (req, res, next) => {
  if (req.body && req.body.email == 'guest@mail.com' && req.body.password == 'guest123') {
    let token = jwt.sign({
      account: {
        id: '356A192B7913B04C54574D18C28D46E6395428AB'
      }
    }, CONFIG.jwt.secret, { expiresIn: '60m' });
    res.send({ token })
    next()
  } else {
    return next(new errors.UnauthorizedError())
  }
})

server.get('/api/auth', (req, res, next) => {
  return res.send(req.auth)
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/auth/status', methods: ['GET'] },
    { url: '/api/auth', methods: ['POST'] }
  ]
}))

module.exports = {
    name: 'Auth (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.auth.port
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
