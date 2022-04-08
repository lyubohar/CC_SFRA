'use strict';

var checkAdditionalShipping = require('*/cartridge/scripts/helpers/checkAdditionalShipping');
var checkDelivery = require('*/cartridge/scripts/helpers/checkDelivery');

module.exports = function (object) {
    Object.defineProperty(object, 'additionalShipping', {
        enumerable: true,
        value: checkAdditionalShipping.checkAdditionalShipping()
    });
    Object.defineProperty(object, 'delivery', {
        enumerable: true,
        value: checkDelivery.checkDelivery()
    });    
};
