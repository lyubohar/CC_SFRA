'use strict';

var Template = require('dw/util/Template'); 

module.exports.render = function (productId) {
    return new Template('templates/default/checkout/confirmation/confirmationEmailIsInclude').render(productId).text
};

