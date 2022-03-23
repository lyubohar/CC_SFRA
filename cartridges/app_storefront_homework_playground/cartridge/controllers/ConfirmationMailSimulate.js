'use strict';

/**
 * @namespace Subscribe
 */

var server = require('server');

/**
 * Simulate confirmation email after order.
*/

server.get('Show', 
    function (req, res, next) {
        res.render('checkout/confirmation/confirmationEmail');
        next();
    }
);

module.exports = server.exports();
