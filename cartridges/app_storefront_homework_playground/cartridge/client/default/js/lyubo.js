$(document).ready(function(){
    var slickElement = $('.lyubo-hero-carousel')

    var xsDisplayIndicators = $(slickElement).attr('data-xs-indicators')
    var xsDisplayControls = $(slickElement).attr('data-xs-controls')
    var xsSlidesDisplay = $(slickElement).attr('data-xs-slides-display')
    var xsSlidesScroll = $(slickElement).attr('data-xs-slides-scroll')

    var smDisplayIndicators = $(slickElement).attr('data-sm-indicators')
    var smDisplayControls = $(slickElement).attr('data-sm-controls')
    var smSlidesDisplay = $(slickElement).attr('data-sm-slides-display')
    var smSlidesScroll = $(slickElement).attr('data-sm-slides-scroll')

    var mdDisplayIndicators = $(slickElement).attr('data-md-indicators')
    var mdDisplayControls = $(slickElement).attr('data-md-controls')
    var mdSlidesDisplay = $(slickElement).attr('data-md-slides-display')
    var mdSlidesScroll = $(slickElement).attr('data-md-slides-scroll')

    var currentWidth = $(window).width()
    
    $(window).resize(function() {
        var dynamicWidth = $(window).width();
        
        if (currentWidth < 544 || dynamicWidth < 544) {
            var prefix = 'xs'
        } else if (currentWidth < 992 || dynamicWidth < 992) {
            var prefix = 'sm'
        } else {
            var prefix = 'md'
        }
        console.log(prefix)
    }).resize();


    console.log(mdSlidesScroll)
    var column = parseInt(mdSlidesScroll)
    var test = parseInt(mdDisplayIndicators)

    slickElement.slick({
        arrows: test,
        dots: mdDisplayControls,
        slidesToShow: mdSlidesDisplay,
        slidesToScroll: 1,
        speed: 400,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        mobileFirst: true
    });
});

