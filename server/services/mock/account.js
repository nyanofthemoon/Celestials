'use strict';

const restify = require('restify');
const errors = require('restify-errors')
const restifyPlugins = require('restify').plugins;
const rjwt = require('restify-jwt-community');
const validator = require('restify-joi-middleware');
const corsMiddleware = require('restify-cors-middleware');

const CONFIG = require('./../../config');
const logger = new CONFIG.environment.logger('SERVICE Account (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.account.options);
const cors = corsMiddleware(CONFIG.cors);
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restifyPlugins.acceptParser(server.acceptable));
server.use(restifyPlugins.queryParser());
server.use(restifyPlugins.bodyParser({mapParams: false}));
server.use(validator());
server.use(restifyPlugins.gzipResponse());

server.get('/api/account/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
});

server.post({ path: '/api/account', validation: validation.account }, (req, res, next) => {
    if (req.body && req.body.email == 'guest@mail.com' && req.body.password == 'guest123') {
        return res.send({
            'id': '356A192B7913B04C54574D18C28D46E6395428AB'
        })
    } else {
        return next(new errors.ConflictError())
    }

});

server.get({ path: '/api/account' }, (req, res, next) => {
  return res.send({
    'id': '356A192B7913B04C54574D18C28D46E6395428AB',
    'email': 'guest@mail.com',
    'password': 'guest123',
    'god': {
      'name': 'HotChiwawa',
      'experience': 0,
      'last_experience': 0,
      'reputation': 0,
      'last_reputation': 0,
      'powers': {
        'deck_size': 5
      },
      'deck': []
    },
    'gems': 100,
    'decks': [
      {}
    ],
    'created_on': 1539174235,
    'modified_on': 1539174235
  })
});

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/account/status', methods: ['GET'] },
    { url: '/api/account', methods: ['POST'] }
  ]
}));

module.exports = {
    name: 'Account (Mock)',
    mock: false,
    start: () => {
      const port = CONFIG.service.account.port
      server.listen(port, () => {
        logger.success(`Listening on port ${port}`)
      });
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    },
};
