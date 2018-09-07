'use strict';

let CryptoJS = require('crypto-js');

let Logger   = require('./logger');
const CONFIG = require('./../config');

class Player {

    constructor(config) {
        this.logger   = new Logger('PLAYER', config);
        this.source   = null;
        this.activity = 0;
        this.data     = {
            name: CONFIG.player.defaultName,
            pass: ''
        };
    }

    initialize(socket, source, data) {
        this.source    = source;
        let that       = this;
        Object.keys(data).forEach(function(key) {
            that.data[key] = data[key];
        });
    }

    // Return a promise
    static findOne(source, id) {
        return source.hgetAsync('player', id);
    }

    // Return a promise
    static findAll(source) {
        return source.hgetallAsync('player');
    }

    // Return a promise
    save() {
        return this.source.hsetAsync('player', this.getId(), JSON.stringify(this.data));
    }

    static getId(name, pass) {
        return CryptoJS.SHA3(pass + CONFIG.player.salt + [...name].reverse().join());
    }

    getId() {
        return Player.getId(this.data.name, this.data.pass);
    }

    getName() {
        return this.data.name;
    }

    query(self) {
        var struct = {
            'type': 'player',
            'data': {
                'name': this.getName()
            }
        };

        return struct;
    }

};

module.exports = Player;
