'use strict';

var Template = require('dw/util/Template'); 

module.exports.render = function () {
    return new Template('templates/default/checkout/confirmation/confirmationEmailIsInclude').render(elementStripped).text
};

