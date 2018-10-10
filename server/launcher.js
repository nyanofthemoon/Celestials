'use strict'

let Logger = require('./logger')
const CONFIG = require('./config')

const logger  = new Logger('LAUNCHER', CONFIG)

const args = require('yargs').argv

const serviceName = args.service || 'all'
const serviceIsMock = args.nomock ?  false : true

try {
    let serviceIds = [];
    if (serviceName != 'all') {
      serviceIds.push(serviceName)
    } else {
      if (!CONFIG.environment.isDev()) {
        serviceIds.push('webserver')
      }
      serviceIds.push('auth')
      serviceIds.push('account')
      serviceIds.push('realm')
      serviceIds.push('market')
      serviceIds.push('messenger')
    }

    for (let id in serviceIds) {
      let serviceId = serviceIds[id]
      logger.info(`Initializing ${serviceId}...`)
      const service = (serviceIsMock ? require(`./services/mock/${serviceId}`) : require(`./services/${serviceId}`))
      service.start()
    }

} catch (e) {
    logger.error(`Service not loaded ${e}`)
}

// node server/launcher.js -> will load all services as mock
// node server/launcher.js --nomock --service=account -> will load account service as no mock
// node server/launcher.js --service=account -> will load account service as mock
