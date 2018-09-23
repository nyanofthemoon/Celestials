'use strict'

module.exports = {

    environment: {
        name: process.env.NODE_ENV || 'development',
        name: process.env.PORT     || '8000',
        host: process.env.HOSTNAME || 'localhost'
    }

}
