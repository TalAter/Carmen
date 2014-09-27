$(window).on('load', function () {

  // jumbotron map
  var mapOptions = {
    center: { lat: 51.502, lng: -0.015},
    zoom: 12,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    zoomControl: false,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi",
        stylers: [
          { visibility: "simplified" },
          { "saturation": -71 },
          { "hue": "#003bff" },
          { "lightness": 15 }
        ]
      },{
        featureType: "administrative",
        stylers: [
          { visibility: "off" }
        ]
      },{
        elementType: "geometry",
        stylers: [
          { "saturation": -71 },
          { "hue": "#003bff" },
          { "lightness": 44 }
        ]
      },{
        featureType: "road",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "transit",
        stylers: [
          { visibility: "off" }
        ]
      },{
        featureType: "road",
        stylers: [
          { lightness: 15 }
        ]
      },{
        featureType: "administrative.neighborhood",
        stylers: [
          { "saturation": -71 },
          { "hue": "#003bff" },
          { "lightness": 65 },
          { visibility: "on" }
        ]
      },{
        featureType: "landscape.natural",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]
  };
  var map = new google.maps.Map(document.getElementById('jumbotronMap'),
      mapOptions);

});

// scroll effect for jumbotron map
$(window).scroll(function(e){
    var offset = $(window).scrollTop()/2;
    $('#jumbotronMap').css('top', (0-offset) + 'px');
    $('#jumbotronMap').css('height', (400+offset) + 'px');
});