//! locus
//! version : 0.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/locus

(function (undefined) {
  "use strict";

  // Save a reference to the global object (window in the browser)
  var _root = this;

  // Get the GeoLocation object
  var _geolocation = navigator.geolocation;

  // Check browser support
  // This is done as early as possible, to make it as fast as possible for unsupported browsers
  if (!_geolocation) {
    _root.Locus = null;
    return undefined;
  }

  // Holds all known fences
  var _fences = {};

  // The id of the geolocation watchPosition
  var _watcherId;


  // Run every time a location is changed, or first identified
  var _locationPing = function(pos) {
    // try and see if current location is in any of the fences
    for (var fenceName in _fences) {
      if (_fences.hasOwnProperty(fenceName)) {
        var fence = _fences[fenceName];
        var fenceMatched = _coordsInFence(pos.coords, fence);

        if (fenceMatched) {
          // Don't rerun function when moving inside a fence
          if (!fence.inhabited) {
            fence.fn();
          }
        }
        fence.inhabited = fenceMatched;
      }
    }
  };

  // Converting degrees to radians
  var _d2r = Math.PI / 180;

  // Calculate distance between two points using haversine formula
  var _calculateDistance = function(coords1, coords2) {
    var lat1 = coords1.latitude;
    var lat2 = coords2.latitude;
    var lon1 = coords1.longitude;
    var lon2 = coords2.longitude;
    // var R = 3958.8; // miles
    var R = 6371; // km
    var φ1 = lat1 * _d2r;
    var φ2 = lat2 * _d2r;
    var Δφ = (lat2-lat1) * _d2r;
    var Δλ = (lon2-lon1) * _d2r;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;

  };

  // Are the given coordinates within the given fence?
  var _coordsInFence = function(coords, fence) {
    return _calculateDistance(coords, fence.coords)*1000 <= fence.radius;
  };

  // Parse a given coordinates string or object
  var _parseCoords = function(coords) {
    coords = coords.replace(/[^\d\,\-\.]/, '');
    coords = coords.split(',');
    return {latitude: parseFloat(coords[0]), longitude: parseFloat(coords[1])};
  };

  // Parse a given radius string
  var _parseRadius = function(radius) {
    return parseFloat(radius.replace(/[^\d\,\-\.]/, ''));
  };



  // Expose functionality
  _root.Locus = {

    //@TODO: Describe the input object in more detail
    /**
     * add new fences to Locus
     *
     * ### Examples:
     *
     *     var fences = {'Moscone': {
     *      'coords': '37.783944,-122.401289',
     *      'radius': '300m',
     *      'fn': function() {}
     *     }};
     *
     *     locus.addFences(fences);
     *
     * @param {Object} fences - fences to add
     * @method addFences
     */
    addFences: function(fences) {
      for (var fenceName in fences) {
        if (fences.hasOwnProperty(fenceName)) {
          var fence = fences[fenceName];
          _fences[fenceName] = {
            'coords':     _parseCoords(fence['coords']),
            'radius':     _parseRadius(fence['radius'] || '500m'),
            'fn':         fence['fn'],
            'inhabited':  false
          };
        }
      }
      return;
    },

    //@TODO: Describe object returned in more detail
    /**
     * Returns all currently registered fences
     *
     * @method addFences
     * @return {Object} fences
     */
    getFences: function() {
      return _fences;
    },

    /**
     * Remove existing fences. Called with a single phrase, array of phrases, or methodically. Pass no params to remove all fences.
     *
     * ### Examples:
     *
     *     // Remove all existing commands
     *     Locus.removeFences();
     *
     *     // Remove just one fence
     *     Locus.removeFences('Moscone');
     *
     *     // Remove two fences
     *     Locus.removeFences(['Moscone', 'Val Thorens']);
     *
     * @param {String|Array|Undefined} [fencesToRemove] - Fences to remove
     * @method removeFences
     */
    removeFences: function(fencesToRemove) {
      if (fencesToRemove === undefined) {
        _fences = {};
        return;
      }

      fencesToRemove = Array.isArray(fencesToRemove) ? fencesToRemove : [fencesToRemove];

      fencesToRemove.forEach(function(fenceToRemove) {
        delete _fences[fenceToRemove];
      });

      return;
    },

    /**
     * Start looking at user's location
     *
     * @method start
     * @return {Boolean} Started?
     */
    start: function() {
      // Check if already started
      if (_watcherId) {
        return false;
      }

      _watcherId = _geolocation.watchPosition(_locationPing);
      return true;
    }

  };

}).call(this);