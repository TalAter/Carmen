$(window).on('load', function () {
});


// scroll effect for jumbotron background
$(window).scroll(function(e){
    var scrolled = $(window).scrollTop();
    $('.jumbotron-bg').css('height', (400-scrolled) + 'px');
});