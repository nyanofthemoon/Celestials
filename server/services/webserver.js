'use strict'

const https = require('https')
const fs = require('fs')

const app = require(__dirname + '/../../client/main')
const CONFIG = require('./../config')

const webserver = https.createServer(CONFIG.service.webserver.options, app.webserver)

module.exports = {
    name: 'Webserver',
    mock: false,
    start: () => {
      const port = CONFIG.service.webserver.port || 443
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
