'use strict'

const fs = require('fs')
const path = require('path')
const jsend = require('./jsend')

const DEFAULT_TAX = 10
const MAX_TAX = 50

const housingSpaceBonus = (currentPopulation, maxPopulation) => {
  return (25 * (currentPopulation / maxPopulation))
}
const foodSurplusBonus = (generationFoodConsumption, foodStockForGeneration) => {
  return (25 * (generationFoodConsumption / foodStockForGeneration))
}
const taxProductivityBonus = (tax) => {
  return 1 - (tax/100)
}
const taxHappinessBonus = (tax) => {
  let taxModifier
  if (tax <= 10) { taxModifier = 0.667
  } else if (tax <= 20) { taxModifier = 0.85
  } else if (tax == 21) { taxModifier = 1.0
  } else if (tax == 22) { taxModifier = 1.1
  } else if (tax == 23) { taxModifier = 1.2
  } else if (tax == 24) { taxModifier = 1.25
  } else if (tax == 25) { taxModifier = 1.3
  } else if (tax == 26) { taxModifier = 1.4
  } else { taxModifier = 1.5 }
  return MAX_TAX - (tax * taxModifier)
}
const happiness = (housingSpaceBonus, foodSurplusBonus, taxHappinessBonus) => {
  return ((housingSpaceBonus + foodSurplusBonus + taxHappinessBonus) / 100)
}
const productivity = (taxProductivityBonus) => {
  return taxProductivityBonus
}
const workerGrowth = (workers, happiness) => {
  return Math.floor(workers * happiness)
}
const goldGeneration = (workers, tax, productivity) => {
  return Math.floor((workers/1) * (tax/100) * productivity)
}
const foodGeneration = (workers, tax, productivity, lakes, fields, forests) => {
  return Math.floor((workers/1) * (tax/100) * productivity * (10*lakes + 5*fields + 2*forests))
}
const woodGeneration = (workers, tax, productivity, forests) => {
  return Math.floor((workers/2) * (tax/100) * productivity * (1*forests))
}
const brickGeneration = (workers, tax, productivity, fields) => {
  return Math.floor((workers/3) * (tax/100) * productivity * (1*fields))
}
const oreGeneration = (workers, tax, productivity, mountains) => {
  return Math.floor((workers/5) * (tax/100) * productivity * (1*mountains))
}
const glassGeneration = (workers, tax, productivity, deserts) => {
  return Math.floor((workers/10) * (tax/100) * productivity * (1*deserts))
}

const CAPITAL_STARTERS = [
  {'desert': 0, 'field': 1, 'forest': 2, 'lake': 0, 'mountain': 2},
  {'desert': 1, 'field': 1, 'forest': 2, 'lake': 0, 'mountain': 0},
  {'desert': 0, 'field': 1, 'forest': 1, 'lake': 1, 'mountain': 0},
]
const COUNTY_STARTERS = [
  {'desert': 0, 'field': 0, 'forest': 1, 'lake': 0, 'mountain': 1},
  {'desert': 1, 'field': 0, 'forest': 1, 'lake': 0, 'mountain': 0},
  {'desert': 0, 'field': 1, 'forest': 0, 'lake': 0, 'mountain': 1},
  {'desert': 1, 'field': 1, 'forest': 0, 'lake': 0, 'mountain': 0},
  {'desert': 1, 'field': 0, 'forest': 0, 'lake': 0, 'mountain': 1},
  {'desert': 0, 'field': 0, 'forest': 0, 'lake': 1, 'mountain': 0},
  {'desert': 0, 'field': 2, 'forest': 0, 'lake': 0, 'mountain': 0},
  {'desert': 0, 'field': 0, 'forest': 2, 'lake': 0, 'mountain': 0},
]

module.exports = {

    environment: {
      name: process.env.NODE_ENV,
      isDev: process.env.ENV_IS_DEV,
      isVerbose: process.env.ENV_IS_VERBOSE,
      logger: require(`./loggers/${process.env.ENV_LOGGER}`)
    },

    cors: {
      preflightMaxAge: 5,
      origins: JSON.parse(process.env.CORS_ORIGINS),
      //allowHeaders: ['API-Token'],
      //exposeHeaders: ['API-Token-Expiry']
    },

    jwt: {
        secret: Buffer.from(process.env.JWT_SECRET, 'base64'),
        credentialsRequired: true,
        requestProperty: 'auth',
        getToken: (req) => {
          if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
          }
          return null;
        }
    },

    service: {
      auth: {
        port: process.env.AUTH_SERVICE_PORT,
        options: {
          name: 'Celestials - Auth Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      account: {
        port: process.env.ACCOUNT_SERVICE_PORT,
        options: {
          name: 'Celestials - Account Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      era: {
        port: process.env.ERA_SERVICE_PORT,
        generationLength: 86000,
        lengthInGenerations: 30,
        options: {
          name: 'Celestials - Era Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      market: {
        port: process.env.MARKET_SERVICE_PORT,
        options: {
          name: 'Celestials - Market Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      messenger: {
        port: process.env.MESSENGER_SERVICE_PORT,
        options: {
          name: 'Celestials - Messenger Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      politics: {
        port: process.env.POLITICS_SERVICE_PORT,
        options: {
          name: 'Celestials - Politics Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      realm: {
        port: process.env.REALM_SERVICE_PORT,
        options: {
          name: 'Celestials - Realm Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        },
        config: {
          defaultTax: DEFAULT_TAX,
          maxTax: MAX_TAX
        },
        county: {
          shuffle: (isCapital) => {
            if (isCapital) {
              return CAPITAL_STARTERS[Math.floor(Math.random() * CAPITAL_STARTERS.length)]
            }
            return COUNTY_STARTERS[Math.floor(Math.random() * COUNTY_STARTERS.length)]
          }
        },
        maths: {
          housingSpaceBonus: housingSpaceBonus,
          foodSurplusBonus: foodSurplusBonus,
          taxHappinessBonus: taxHappinessBonus,
          taxProductivityBonus: taxProductivityBonus,
          happiness: happiness,
          productivity: productivity,
          workerGrowth: workerGrowth
        },
      },
      roguery: {
        port: process.env.ROGUERY_SERVICE_PORT,
        options: {
          name: 'Celestials - Roguery Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      sorcery: {
        port: process.env.SORCERY_SERVICE_PORT,
        options: {
          name: 'Celestials - Sorcery Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      warfare: {
        port: process.env.WARFARE_SERVICE_PORT,
        options: {
          name: 'Celestials - Warfare Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      },
      webserver: {
        port: process.env.WEBSERVER_SERVICE_PORT,
        options: {
          name: 'Celestials - Web Service',
          formatters: { 'application/json': jsend },
          ignoreTrailingSlash: true,
          key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
          certificate: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
        }
      }
    },

    store: {
      // See https://www.npmjs.com/package/redis
      redis: {
          url: process.env.REDIS_URL,
          options: {}
      },
      // See https://www.npmjs.com/package/hazelcast-client
      hazelcast: {
          url: process.env.HAZELCAST_URL,
          options: {}
      }
    },

    default: {
      tax: DEFAULT_TAX
    },

    max: {
      tax: DEFAULT_TAX
    },

    maths: {
      housingSpaceBonus: housingSpaceBonus,
      foodSurplusBonus: foodSurplusBonus,
      taxHappinessBonus: taxHappinessBonus,
      taxProductivityBonus: taxProductivityBonus,
      happiness: happiness,
      productivity: productivity,
      workerGrowth: workerGrowth
    },

    costs: {

    }

}
