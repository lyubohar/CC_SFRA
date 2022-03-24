'use strict';

var ContentMgr = require('dw/content/ContentMgr');
var defaultShipping = ContentMgr.getContent('shipping') 
var additionalShipping = ContentMgr.getContent('_lyubo_pdp_additional_shipping')  

/**
 * Checks for additional shipping method in Content Assets and returns as string
 * @returns {string} body of returned content asset
 */

// Hide placeholder
var contentAssetBodyStripped = additionalShipping.custom.body.toString().replace(/\%%(.*?)\%%/g, "");

function checkAdditionalShipping() {
    if (!empty(additionalShipping) && additionalShipping.isOnline()) {
        return contentAssetBodyStripped
    } else {
        return defaultShipping.custom.body
    }
}

module.exports = {
    checkAdditionalShipping: checkAdditionalShipping
};
