'use strict'

const restify = require('restify')
const restifyPlugins = require('restify').plugins
const rjwt = require('restify-jwt-community')
const validator = require('restify-joi-middleware')
const corsMiddleware = require('restify-cors-middleware')

const Logger = require('./../../logger')
const CONFIG = require('./../../config')
const logger = new Logger('SERVICE Realm (Mock)', CONFIG)
const validation = require('./../../validation').validate

const server = restify.createServer(CONFIG.service.realm.options)
const cors = corsMiddleware(CONFIG.cors)
server.pre(cors.preflight)
server.use(cors.actual)
server.use(restifyPlugins.acceptParser(server.acceptable))
server.use(restifyPlugins.queryParser())
server.use(restifyPlugins.bodyParser({mapParams: false}))
server.use(validator())
server.use(restifyPlugins.gzipResponse())

server.get('/api/realm/status', (req, res, next) => {
  return res.send({
    'status': 'OK',
    'mock': true,
    'version': '1.0.0'
  })
})

const SHUFFLE = [
  {'desert': 2, 'field': 3, 'forest': 3, 'lake': 0, 'mountain': 2},
  {'desert': 1, 'field': 3, 'forest': 1, 'lake': 2, 'mountain': 1},
  {'desert': 3, 'field': 2, 'forest': 2, 'lake': 1, 'mountain': 1}
]
server.post('/api/realm/shuffle', (req, res, next) => {
  return res.send(SHUFFLE[Math.floor(Math.random() * SHUFFLE.length)])
})

server.get('/api/realm', (req, res, next) => {
  return res.send({
    'id': '17BA0791499DB908433B80F37C5FBC89B870084B',
    'created_on': 1539174235,
    'modified_on': 1539174235,
    'name': 'Land of Chiwawas',
    'x': 0,
    'y': 0,
    'god': {
      'name': 'HowChiwawa',
      'powers': {
        'deck_size': 5
      },
      'hand': [],
      'deck': []
    },
    'ruler': {
      'gender': 'male',
      'race': 'human',
      'name': 'King Nacho the Great',
      'generations': 0,
      'fame': 0,
      'last_fame': 0
    },
    'resources': {
      'gold': 0,
      'food': 0,
      'ore': 0,
      'wood': 0,
      'brick': 0,
      'glass': 0
    },
    'counties': [
      {
        'id': '28C27031FE7162D732A1C2E209A40BBFCB5FEF90',
        'x': 0,
        'y': 0,
        'capital': true,
        'colonized': true,
        'tax': 10,
        'housing': 1,
        'population': {
          'worker': 1000,
          'military': 100,
          'rogue': 0,
          'sorcerer': 0
        },
        'resources': {
          'forest': 0,
          'field': 0,
          'lake': 0,
          'mountain': 0,
          'desert': 0
        },
        'last': {
          'happiness': 50,
          'population': 1100
        }
      },
      {
        'id': 'CB7D29F43F4A81FF1F3A1202C80293337FAA7A0A',
        'x': 1,
        'y': 1,
        'capital': false,
        'colonized': false,
        'tax': 0,
        'housing': 0,
        'population': {
          'worker': 0,
          'military': 0,
          'rogue': 0,
          'sorcerer': 0
        },
        'resources': {
          'forest': 0,
          'field': 0,
          'lake': 0,
          'mountain': 0,
          'desert': 0
        },
        'last': {
          'happiness': 0,
          'population': 0
        }
      },
      {
        'id': '0371438F82B01EFB31E37CD12A4A6B6C819B0E71',
        'x': 2,
        'y': 2,
        'capital': false,
        'colonized': false,
        'tax': 0,
        'housing': 0,
        'population': {
          'worker': 0,
          'military': 0,
          'rogue': 0,
          'sorcerer': 0
        },
        'resources': {
          'forest': 0,
          'field': 0,
          'lake': 0,
          'mountain': 0,
          'desert': 0
        },
        'last': {
          'happiness': 0,
          'population': 0
        }
      },
      {
        'id': 'AAA025B3826509827B773A79DDE61238B7846C09',
        'x': 3,
        'y': 3,
        'capital': false,
        'colonized': false,
        'tax': 0,
        'housing': 0,
        'population': {
          'worker': 0,
          'military': 0,
          'rogue': 0,
          'sorcerer': 0
        },
        'resources': {
          'forest': 0,
          'field': 0,
          'lake': 0,
          'mountain': 0,
          'desert': 0
        },
        'last': {
          'happiness': 0,
          'population': 0
        }
      }
    ],
    'world': [
      
    ]
  })
})

server.use(rjwt(CONFIG.jwt).unless({
  path: [
    { url: '/api/realm/status', methods: ['GET'] }
  ]
}))

module.exports = {
    name: 'Realm (Mock)',
    mock: false,
    start: () => {
      const port = CONFIG.service.realm.port
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
