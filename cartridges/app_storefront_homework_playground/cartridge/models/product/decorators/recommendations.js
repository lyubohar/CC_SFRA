'use strict';

module.exports = function (object, apiProduct) {
    Object.defineProperty(object, 'recommendations', {
        enumerable: true,
        value: apiProduct.recommendations
    });
};
