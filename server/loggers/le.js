'use strict'

const util = require('util')
const le_node = require('le_node');


class Logger {

    constructor(namespace, config) {
        if (namespace.length < 24) {
            namespace += ' '.repeat(24 - namespace.length)
        }

        this.namespace = namespace
        this.debug = config.environment.isVerbose
        this.logger = new le_node({ token: process.env.LE_NODEJS_TOKEN })
    }

    error(message, error) {
        this.logger.err(message)
        if (error) {
            this.logger.crit(error)
        }
    }

    info(message, object) {
        this.logger.notice(message)
        if (object && this.debug) {
            this.logger.debug(util.inspect(object))
        }
    }

    success(message) {
       this.logger.info(message)
    }

    verbose(message) {
        if (this.debug) {
            this.logger.debug(message)
        }
    }

    warning(message) {
        this.logger.warn(message)
    }

}

module.exports = Logger
