var breakpoints = require('./settings/breakpoints.json');

$(document).ready(function(){
    var carouselElement = $('.lyubo-hero-carousel')

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
    
    if ($(window).width() < breakpoints.mobile) {
        var displayIndicators = xsDisplayIndicators
        var displayControls = xsDisplayControls
        var slidesDisplay = xsSlidesDisplay
        var slidesScroll = xsSlidesScroll    
    } else if ($(window).width() < breakpoints.tablet) {
        var displayIndicators = smDisplayIndicators
        var displayControls = smDisplayControls
        var slidesDisplay = smSlidesDisplay
        var slidesScroll = smSlidesScroll    
    } else {
        var displayIndicators = mdDisplayIndicators
        var displayControls = mdDisplayControls
        var slidesDisplay = mdSlidesDisplay
        var slidesScroll = mdSlidesScroll
    }  
    
    function slickInit() {
        carouselElement.slick({
            arrows: displayIndicators,
            dots: displayControls,
            slidesToShow: slidesDisplay,
            slidesToScroll: slidesScroll,
            speed: 400,
            infinite: true
        });
    }
    slickInit()

    $(window).resize(function() {
        // var prefix 
        // if ($(window).width() < breakpoints.mobile) {
        //     prefix = 'xs'
        // } else if ($(window).width() < breakpoints.tablet) {
        //     prefix = 'sm'
        // } else {
        //     prefix = 'md'
        // }
        // carouselElement.slick("unslick")
        // slickInit()
    }).resize()
});
