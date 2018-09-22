'use strict'

let app = require(__dirname + '/../../client/main')

const CONFIG = require('./../config')

const webserver = require('http').createServer(app.webserver)

module.exports = {
    name: 'Webserver',
    mock: false,
    start: () => {
      const port = CONFIG.service.webserver.port
      webserver.listen(port, function () {
          app.logger.success(`Listening on port ${port}`)
      })
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    }
}
