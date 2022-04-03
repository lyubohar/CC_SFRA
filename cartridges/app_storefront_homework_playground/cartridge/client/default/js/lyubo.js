var breakpoints = require('./settings/breakpoints.json');

$(document).ready(function () {
    var carouselElement = $('.lyubo-hero-carousel')

    // Define data-attributes and set defaults
    var xsDisplayIndicators = $(carouselElement).attr('data-xs-indicators') === 'true' ? true : false
    var xsDisplayControls = $(carouselElement).attr('data-xs-controls') === 'true' ? true : false
    var xsSlidesDisplay = $(carouselElement).attr('data-xs-slides-display') ? Number($(carouselElement).attr('data-xs-slides-display')) : 1
    var xsSlidesScroll = $(carouselElement).attr('data-xs-slides-scroll') ? Number($(carouselElement).attr('data-xs-slides-scroll')) : 1

    var smDisplayIndicators = $(carouselElement).attr('data-sm-indicators') === 'true' ? true : false
    var smDisplayControls = $(carouselElement).attr('data-sm-controls') === 'true' ? true : false
    var smSlidesDisplay = $(carouselElement).attr('data-sm-slides-display') ? Number($(carouselElement).attr('data-sm-slides-display')) : 2
    var smSlidesScroll = $(carouselElement).attr('data-sm-slides-scroll') ? Number($(carouselElement).attr('data-sm-slides-scroll')) : 1

    var mdDisplayIndicators = $(carouselElement).attr('data-md-indicators') === 'true' ? true : false
    var mdDisplayControls = $(carouselElement).attr('data-md-controls') === 'true' ? true : false
    var mdSlidesDisplay = $(carouselElement).attr('data-md-slides-display') ? Number($(carouselElement).attr('data-md-slides-display')) : 3
    var mdSlidesScroll = $(carouselElement).attr('data-md-slides-scroll') ? Number($(carouselElement).attr('data-md-slides-scroll')) : 1

    // Slick carousel
    carouselElement.slick({
        arrows: xsDisplayIndicators,
        dots: xsDisplayControls,
        slidesToShow: xsSlidesDisplay,
        slidesToScroll: xsSlidesScroll,
        speed: 400,
        infinite: true,
        mobileFirst: true,
        responsive: [{
            breakpoint: breakpoints.mobile,
            settings: {
                arrows: smDisplayIndicators,
                dots: smDisplayControls,
                slidesToShow: smSlidesDisplay,
                slidesToScroll: smSlidesScroll
            },
        },
        {
            breakpoint: breakpoints.tablet,
            settings: {
                arrows: mdDisplayIndicators,
                dots: mdDisplayControls,
                slidesToShow: mdSlidesDisplay,
                slidesToScroll: mdSlidesScroll
            },
        }],
    });
});
