'use strict';

// Set active thumbnail 
$('.carousel-item').click(function () {
    $('.carousel-item').removeClass("active");
    $(this).addClass("active");  
});  

// Show large image on click of thumbnail
function showLargeImage() {
    $('.carousel-item img').click(function () {
        var smallImageUrl = $(this).attr('src')
        var smallImageAlt = $(this).attr('alt')
        var largeImageUrl = smallImageUrl.replace('thumbnail', 'large').replace('small', 'large');
        var largeImageAlt = smallImageAlt.replace('thumbnail', 'large').replace('small', 'large');
        $('.carousel-item-main img').attr('src', largeImageUrl)
        $('.carousel-item-main img').attr('alt', largeImageAlt)
    });
}
showLargeImage()

// Set active attribute
$('.attr-element').click(function () {
    $('.attr-element').removeClass("active");
    $(this).addClass("active");  
});

module.exports = {
    showLargeImage: showLargeImage
};
