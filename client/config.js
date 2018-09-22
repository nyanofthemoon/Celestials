'use strict'

module.exports = {

    environment: {
        name: process.env.NODE_ENV   || 'development',
        host: process.env.HOSTNAME   || 'localhost'
    }

}
