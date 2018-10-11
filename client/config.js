'use strict'

module.exports = {

    environment: {
        name: process.env.NODE_ENV || 'development',
        port: process.env.PORT     || '9000',
        host: process.env.HOSTNAME || 'localhost'
    }

}
