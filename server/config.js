'use strict';

module.exports = {

    environment: {
        name:    process.env.NODE_ENV    || 'development',
        port:    process.env.PORT        || 8000,
        verbose: process.env.VERBOSE     || true
    },

    player: {
        salt: process.env.PLAYER_SALT      || '!pur1n+',
    },

    // See https://www.npmjs.com/package/redis
    redis: {
        url:     process.env.REDIS_URL || 'redis://127.0.0.1:6379',
        options: {}
    }

}
