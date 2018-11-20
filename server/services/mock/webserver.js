'use strict'

const fs = require('fs')
const restify = require('restify');

const CONFIG = require('./../../config')
const logger = new CONFIG.environment.logger('SERVICE Webserver (Mock)', CONFIG)

const server = restify.createServer({
  key: fs.readFileSync('./server.key'),
  certificate: fs.readFileSync('./server.crt')
})

server.get('/*', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
});

module.exports = {
    name: 'Webserver (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.webserver.port || 443
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
