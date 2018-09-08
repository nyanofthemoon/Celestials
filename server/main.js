'use strict';

let app = require(__dirname + '/../client/main');

const CONFIG = require('./config');

var server = require('http').createServer(app.webserver);
server.listen(CONFIG.environment.port, function () {
    app.logger.success('Listening on port ' + CONFIG.environment.port);
});
