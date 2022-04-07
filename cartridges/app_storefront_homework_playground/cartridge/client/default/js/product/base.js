'use strict';

var base = require('base/product/base');

$(document).ready(function () {
    var imageElement = $('.carousel-item img')

    $(imageElement).click(function () {
        var currentImageUrl = $(this).attr('src')
        $('.carousel-item-main img').attr('src', currentImageUrl)
    });

});

module.exports = {
    selectAttribute: function () {
        $(document).on('change', '.attr-element', function (e) {
            e.preventDefault();

            var $productContainer = $(this).closest('.set-item');
            if (!$productContainer.length) {
                $productContainer = $(this).closest('.product-detail');
            }
            base.attributeSelect(e.currentTarget.value, $productContainer);
        });
    }
};

