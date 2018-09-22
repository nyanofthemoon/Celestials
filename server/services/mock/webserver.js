'use strict'

module.exports = {
    name: 'Webserver Mock',
    mock: true,
    start: () => { console.log('HI START') }, // eslint-disable-line no-console
    stop: () => { console.log('HI STOP') }, // eslint-disable-line no-console
}
