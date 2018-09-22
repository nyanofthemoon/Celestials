'use strict';

let Logger = require('./logger');
const CONFIG = require('./config');

const logger  = new Logger('LAUNCHER', CONFIG);

const args = require('yargs').argv;

const serviceName = args.service || 'all'
const serviceIsMock = args.nomock ?  false : true

logger.info(`Loading service ${serviceName}`)

try {
  const service = (serviceIsMock ? require(`./services/mock/${serviceName}`) : require(`./services/${serviceName}`))
  service.start()
} catch (e) {
  logger.error(`Service not loaded ${e}`)
}

// node server/launcher.js -> will load all services as mock
// node server/launcher.js --nomock --service=account -> will load account service as no mock
// node server/launcher.js --service=account -> will load account service as mock