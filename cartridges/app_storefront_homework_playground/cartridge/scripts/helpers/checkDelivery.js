'use strict';

var ContentMgr = require('dw/content/ContentMgr');
var productDeliveryAsset = ContentMgr.getContent('_delivery-info-666666666666M');
var defaultDeliveryAsset = ContentMgr.getContent('_delivery-info-default');

/**
 * Checks for delivery Content Assets and returns as string
 * @returns {string} body of returned content asset
 */

function checkDelivery() {
    if (!empty(productDeliveryAsset) && productDeliveryAsset.isOnline()) {
        return productDeliveryAsset.custom.body
    } else {
        return defaultDeliveryAsset.custom.body
    }
}

module.exports = {
    checkDelivery: checkDelivery
};
