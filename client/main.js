'use strict'

const CONFIG = require('./config')

let express = require('express')

let logger = new (require('./../server/logger'))('SERVER [WEB]', CONFIG)

let options = {
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