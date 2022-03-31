$(document).ready(function(){
    var slickElement = $('.lyubo-hero-carousel')

    var xsDisplayIndicators = $(slickElement).hasClass('xs-display-indicators') ? true : false
    var xsDisplayControls = $(slickElement).hasClass('xs-display-controls') ? true : false
    var xsSlidesDisplay = $("[class^='xs-slides-display-']").attr('class') ? $("[class^='xs-slides-display-']").attr('class').split('-').pop() : 1
    var xsSlidesScroll = $("[class^='xs-slides-scroll-']").attr('class') ? $("[class^='xs-slides-scroll-']").attr('class').split('-').pop() : 1

    var smDisplayIndicators = $(slickElement).hasClass('sm-display-indicators') ? true : false
    var smDisplayControls = $(slickElement).hasClass('sm-display-controls') ? true : false
    var smSlidesDisplay = $("[class^='sm-slides-display-']").attr('class') ? $("[class^='sm-slides-display-']").attr('class').split('-').pop() : 2
    var smSlidesScroll = $("[class^='sm-slides-scroll-']").attr('class') ? $("[class^='sm-slides-scroll-']").attr('class').split('-').pop() : 2

    var mdDisplayIndicators = $(slickElement).hasClass('md-display-indicators') ? true : false
    var mdDisplayControls = $(slickElement).hasClass('md-display-controls') ? true : false
    var mdSlidesDisplay = $("[class^='md-slides-display-']").attr('class') ? $("[class^='md-slides-display-']").attr('class').split('-').pop() : 3
    var mdSlidesScroll = $("[class^='md-slides-scroll-']").attr('class') ? $("[class^='md-slides-scroll-']").attr('class').split('-').pop() : 3

    var currentWidth = $(window).width();
    console.log(currentWidth)
    
    $(window).on('resize', function() {
        var dynamicWidth = $(window).width();
        
        if (currentWidth < 544 && dynamicWidth < 544) {
            var prefix = 'xs'
        } else if (currentWidth < 992 && dynamicWidth < 992) {
            var prefix = 'sm'
        } else {
            var prefix = 'md'
        }
    });

    $(slickElement).slick({
        arrows: mdDisplayIndicators,
		dots: mdDisplayControls,
        slidesToShow: mdSlidesDisplay,
        slidesToScroll: mdSlidesScroll,
        speed: 400,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        mobileFirst: true
    });

    console.log('xs-disp: ' + xsSlidesDisplay)
    console.log('xs-scroll: ' + xsSlidesScroll)
    console.log('sm-disp: ' + smSlidesDisplay)
    console.log('sm-scroll: ' + smSlidesScroll)
    console.log('md-disp: ' + mdSlidesDisplay)
    console.log('md-scroll: ' + mdSlidesScroll)
});

