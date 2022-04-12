'use strict';

var Template = require('dw/util/Template'); 

module.exports.render = function (productId) {
    return new Template('checkout/confirmation/confirmationEmailIsInclude').render({productId : productId}).text
};

