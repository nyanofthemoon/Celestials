'use strict'

const restify = require('restify');
const errors = require('restify-errors');

const Logger = require('./../../logger')

const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Market (Mock)', CONFIG)

const server = restify.createServer();
server.get('/*', (req, res, next) => {
  logger.warning('get /* ')
  return next(new errors.NotFoundError('404'))
});

server.get('/api/market/status', (req, res, next) => {
  res.send({});
  next()
});

let DATA = {
  "food": {
    "stock": 4250,
    "value": 1
  },
  "gold": {
    "stock": 250,
    "value": 20
  },
  "wood": {
    "stock": 125,
    "value": 40
  },
  "brick": {
    "stock": 85,
    "value": 50
  },
  "ore": {
    "stock": 50,
    "value": 100
  },
  "glass": {
    "stock": 25,
    "value": 200
  }
}

server.get('/api/market', (req, res, next) => {
  res.send(DATA);
  next()
});

server.post('/api/market/trade', (req, res, next) => {
  // of_amount   50
  // of_type  gold
  // for_type wood
  res.send({
    'of_amount': 50,
    'of_type': 'gold',
    'for_amount': 25,
    'for_type': 'wood'
  });
  next()
});

module.exports = {
    name: 'Market (Mock)',
    mock: true,
    start: () => {
      const port = CONFIG.service.market.port
      server.listen(port, () => {
        logger.success(`Listening on port ${port}`)
      });
    },
    stop: () => {
      server.close(() => {
        logger.warning(`Stopped listening`)
      })
    },
}
