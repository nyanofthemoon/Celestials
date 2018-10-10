'use strict'

const jsend = require('./jsend')

module.exports = {

    environment: {
        name: process.env.NODE_ENV || 'development',
        isDev: () => { return process.env.NODE_ENV === 'development' }
    },

    service: {
      webserver: {
        port: process.env.WEBSERVER_SERVICE_PORT || 8000,
        options: {
          name: 'NyanCat - Web Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
      },
      auth: {
        secret: process.env.AUTH_SERVICE_SECRET || 'qwerty',
        port: process.env.AUTH_SERVICE_PORT || 8100,
        options: {
          name: 'NyanCat - Auth Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
      },
      account: {
        port: process.env.ACCOUNT_SERVICE_PORT || 8200,
        options: {
          name: 'NyanCat - Account Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
      },
      realm: {
        port: process.env.REALM_SERVICE_PORT || 8300,
        options: {
          name: 'NyanCat - Realm Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
      },
      market: {
        port: process.env.MARKET_SERVICE_PORT || 8400,
        options: {
          name: 'NyanCat - Market Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
      },
      messenger: {
        port: process.env.MESSENGER_SERVICE_PORT || 8500,
        options: {
          name: 'NyanCat - Messenger Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true
        }
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
