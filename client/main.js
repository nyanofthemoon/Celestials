'use strict'

const CONFIG = require('./config')
const SERVER_CONFIG = require('./server/config')

const express = require('express')
const https = require('https');
const fs = require('fs');

const logger = new SERVER_CONFIG.environment.logger('SERVICE Webserver', SERVER_CONFIG)

const options = {
    dotfiles  : 'ignore',
    etag      : false,
    extensions: ['htm', 'html'],
    index     : 'index.html',
    maxAge    : '1d',
    redirect  : true,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

let app = express()

app.use(express.static('client/public', options))

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/not-found.html')
})

module.exports = {
    webserver: app,
    logger: logger
}
