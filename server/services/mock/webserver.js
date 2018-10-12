'use strict'

const fs = require('fs')
const restify = require('restify');

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger  = new Logger('SERVICE Webserver (Mock)', CONFIG)

const server = restify.createServer({
  key: fs.readFileSync('./server.key'),
  certificate: fs.readFileSync('./server.crt')
})

server.get('/*', (req, res, next) => {
  res.send('OK')
  next()
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
