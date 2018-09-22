'use strict';

let app = require(__dirname + '/../../client/main');

const CONFIG = require('./../config');

const webserver = require('http').createServer(app.webserver);

function start() {
  webserver.listen(CONFIG.environment.port, function () {
    app.logger.success('Listening on port ' + CONFIG.environment.port);
  });
}

function stop() {
  server.stop() // ?
}

module.exports = {
    name: 'Webserver',
    mock: false,
    start,
    stop
}
