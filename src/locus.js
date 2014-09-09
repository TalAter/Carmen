//! locus
//! version : 0.1.0
//! author  : Tal Ater @TalAter
//! license : MIT
//! https://github.com/TalAter/locus

(function (undefined) {
  "use strict";

  // Save a reference to the global object (window in the browser)
  var _root = this;

  // Holds all known fences
  var _fences = {};

  // Expose functionality
  _root.Locus = {

    //@TODO: Describe object in more detail
    /**
     * add new fences to Locus
     *
     * ### Examples:
     *
     *     var fences = {'Moscone': {
     *      'coord': '37.783944,-122.401289',
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
      _fences = fences;
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
    }
  };

}).call(this);