'use strict';

var ContentMgr = require('dw/content/ContentMgr');
var defaultDeliveryAsset = ContentMgr.getContent('_delivery-info-default');

/**
 * Checks for delivery Content Assets and returns as string
 * @returns {string} body of returned content asset
*/

function checkDelivery(product) {
    var dynamicAssetId = '_delivery-info-' + product.id;
    var productDeliveryAsset = ContentMgr.getContent(dynamicAssetId);

    if (!empty(productDeliveryAsset) && productDeliveryAsset.isOnline()) {
        return productDeliveryAsset.custom.body
    } else {
        return defaultDeliveryAsset.custom.body
    }
}

module.exports = {
    checkDelivery: checkDelivery
};
