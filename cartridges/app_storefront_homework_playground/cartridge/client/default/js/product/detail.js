'use strict';

// Set active thumbnail 
$('.carousel-item').click(function () {
    $('.carousel-item').removeClass("active");
    $(this).addClass("active");  
});  

// Show large image on click of thumbnail
$('.carousel-item img').click(function () {
    var smallImageUrl = $(this).attr('src')
    var largeImageUrl = smallImageUrl.replace('thumbnail', 'large').replace('small', 'large');
    $('.carousel-item-main img').attr('src', largeImageUrl)
});

// Set active attribute
$('.attr-element').click(function () {
    $('.attr-element').removeClass("active");
    $(this).addClass("active");  
});
