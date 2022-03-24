'use strict';

var checkAdditionalShipping = require('*/cartridge/scripts/helpers/checkAdditionalShipping');

module.exports = function (object) {
    Object.defineProperty(object, 'additionalShipping', {
        enumerable: true,
        value: checkAdditionalShipping.checkAdditionalShipping()
    });
};
