$(document).ready(function(){
    $('.lyubo-hero-carousel').slick({
        arrows: true,
        speed: 400,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 2,
        slidesToScroll: 1,
        mobileFirst: true,
        responsive: [{
          breakpoint: 768,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        }]
    }); 
});
