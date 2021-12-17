'use strict';

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');
var swapiService = require('*/cartridge/scripts/swapiService.js');

/**
 * Parses JSON object provided by Star Wars API.
 * Renders tip_of_the_day.isml template and provides it with deathStar object, containing data from API.
 * 
 * @name Base/Tips-Show
 * @function
 * @memberof Home
 * @param {middleware} - server.middleware.https
 * @param {middleware} - cache.applyDefaultCache
 * @param {category} - sensititve
 * @param {renders} - isml
 * @param {serverfunction} - get
*/

server.get(
    'Show',
    server.middleware.include,
    cache.applyDefaultCache,
    function (req, res, next) {

        var deathStar = JSON.parse(swapiService.getDeathStar());

        res.render('tip_of_the_day', {
            name : deathStar.name,
            manufacturer : deathStar.manufacturer,
            classification : deathStar.starship_class,
            cost : deathStar.cost_in_credits
        });
        next();
    }
);

module.exports = server.exports();
