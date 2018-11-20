'use strict';

var sanitizer = require('sanitizer');

let Player        = require('./player');
let RedisClient   = require('./../db/redis-client');
let Cycling       = require('./../workers/cycling');

const CONFIG = require('./../config')
const Logger   = CONFIG.environment.logger

class World {

    constructor(config) {
        this.logger  = new Logger('WORLD', config);
        this.sockets = null;
        this.source  = null;
        this.workers = {};
        this.data    = {
            players  : {},
            sessions : {}
        };
    }

    addPlayer(player) {
        this.data.players[player.getId()] = player;
    };

    getPlayer(sessionIdentifier) {
        return this.data.players[sessionIdentifier] || null;
    };

    getPlayers() {
        return this.data.players || {};
    };

    static initialize(io, config) {
        return new Promise(function(resolve, reject) {
            let world     = new World(config);
            world.sockets = io;
            new RedisClient(config).initialize()
                .then(function(clientOne) {

                    // Subscribe to Events
                    clientOne.subscribe('system');
                    let cycling = new Cycling(config);
                    cycling.subscribe(clientOne);
                    world.workers.cycling = cycling;

                    // Handle Event Messages
                    clientOne.on('message', function(channel, message) {
                        try {
                            message = JSON.parse(message);
                            switch (channel) {
                                case cycling.namespace:
                                    cycling.initialize(message);
                                    cycling.notify(world.sockets);
                                    break;
                                case 'system':
                                    switch(message.type) {
                                        case 'save-players':
                                            for (let key in world.data.players) {
                                                world.data.players[key].save();
                                            }
                                            break;
                                        default:
                                            break;
                                    }
                                default:
                                    break;
                            }
                            world.logger.info('Notification received from ' + channel, message);
                        } catch (e) {
                            world.logger.error('Notification error from ' + channel + ' with ' + message, e);
                        }
                    });

                    new RedisClient(config).initialize()
                        .then(function (clientTwo) {
                            world.source = clientTwo;
                                            Player.findAll(world.source)
                                                .then(function(players) {
                                                    // Initialize Players
                                                    if (players) {
                                                        Object.keys(players).forEach(function(key) {
                                                            let player = new Player(config);
                                                            player.initialize(null, world.source, JSON.parse(players[key]));
                                                            world.data.players[player.getId()] = player;
                                                        });
                                                    }
                                                    resolve(world);
                                                }).catch(function (e) {
                                                    reject(e);
                                                });
                                }).catch(function (e) {
                                    reject(e);
                                });
        });
    }

    /*
    bindSocketToModuleEvents(socket) {
        var that = this;
        try {
            socket.on('error',       function(data) { that.error(data, socket); });
            socket.on('query',       function(data) { that.query(data, socket); });
        } catch (e) {
            this.logger.error('Socket ' + socket.id + ' not bound to events ', e);
        }
    }

    error(data, socket) {
        try {
            socket.emit('error', {event: 'error'});
        } catch (e) {
            this.logger.error('An unknown socket error has occured', e);
        }
    }
    */

    getPlayerBySocketId(id) {
        return this.data.players[this.data.sessions[id]];
    }

    query(data, socket) {
        try {
            let info = null;
            switch(data.type) {
                case 'player':
                    info = this.getPlayerBySocketId(socket.id).query(true);
                    break;
                case 'cycling':
                    info = this.workers.cycling.query();
                    break;
                default: break;
            }
            socket.emit('query', info);
            this.logger.verbose('[QUERY] ' + data.type);
        } catch (e) {
            this.logger.error('[QUERY] ' + JSON.stringify(info) + ' ' + e);
        }
    }

};

module.exports = World;
