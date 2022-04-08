'use strict';

var base = require('base/product/base');

base.selectAttribute = function () {
    $(document).on('change', '.attr-element', function (e) {
        e.preventDefault();

        var $productContainer = $(this).closest('.set-item');
        if (!$productContainer.length) {
            $productContainer = $(this).closest('.product-detail');
        }
        base.attributeSelect(e.currentTarget.value, $productContainer);
    });
};

module.exports = base;
