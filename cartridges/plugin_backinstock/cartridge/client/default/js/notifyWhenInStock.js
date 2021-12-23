'use strict';

var processInclude = require('*/cartridge/client/default/js/util');

$(document).ready(function () {
    processInclude(require('./notifyWhenInStock/notifyWhenInStock'));
});
