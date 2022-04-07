'use strict';

var base = require('base/product/base');

$(document).ready(function () {
    var imageElement = $('.carousel-item img')

    // Set active thumbnail 
    $('.carousel-item').click(function () {
        $('.carousel-item').removeClass("active");
        $(this).addClass("active");  
    });  

    // Show large image on click of thumbnail
    $(imageElement).click(function () {
        var smallImageUrl = $(this).attr('src')
        var largeImageUrl = smallImageUrl.replace('small', 'large');
        $('.carousel-item-main img').attr('src', largeImageUrl)
    });

    // Set active attribute
    $('.attr-element').click(function () {
        $('.attr-element').removeClass("active");
        $(this).addClass("active");  
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

