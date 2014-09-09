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
      for (var fenceName in fences) {
        if (fences.hasOwnProperty(fenceName)) {
          var fence = fences[fenceName];
          _fences[fenceName] = {
            'coord':  fence['coord'],
            'fn':     fence['fn']
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
    }

  };

}).call(this);