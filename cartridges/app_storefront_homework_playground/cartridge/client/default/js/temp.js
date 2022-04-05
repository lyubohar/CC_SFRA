$(document).ready(function () {
    var imageElement = $('.carousel-item img')

    $(imageElement).click(function () {
        var currentImageUrl = $(this).attr('src')
        $('.carousel-item-main img').attr('src', currentImageUrl)
    });
});

