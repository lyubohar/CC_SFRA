'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var swapiService = require('*/cartridge/scripts/swapiService.js');

/**
 * 
 * 
 * 
 */

server.get(
    'Swapi',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {

        var deathStar = JSON.parse(swapiService.getDeathStar());

        res.render('deathstar', {
            name : deathStar.name,
            manufacturer : deathStar.manufacturer,
            classification : deathStar.starship_class,
            cost : deathStar.msg
        });
        next();
    }
);

module.exports = server.exports();
