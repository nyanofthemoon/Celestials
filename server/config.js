'use strict'

module.exports = {

    environment: {
        name: process.env.NODE_ENV || 'development',
        isDev: () => { return process.env.NODE_ENV === 'development' },
        verbose: process.env.VERBOSE || true
    },

    service: {
      webserver: {
        port: process.env.WEBSERVER_SERVICE_PORT || 8000
      },
      auth: {
        port: process.env.AUTH_SERVICE_PORT || 8100
      },
      account: {
        port: process.env.ACCOUNT_SERVICE_PORT || 8200
      },
    },

    store: {
      // See https://www.npmjs.com/package/redis
      redis: {
          url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
          options: {}
      },
      // See https://www.npmjs.com/package/hazelcast-client
      hazelcast: {
          url: process.env.HAZELCAST_URL || 'hazelcast://127.0.0.1:7337',
          options: {}
      }
    }

}
