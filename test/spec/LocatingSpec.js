(function() {
  "use strict";

  describe('Location matching', function() {
    var spyOnGibraltar;
    var spyOnHemingway;
    var spyOnFortKnox;
    var geolocation = navigator.geolocation;

    beforeEach(function() {
      spyOnGibraltar = jasmine.createSpy();
      spyOnHemingway = jasmine.createSpy();
      spyOnFortKnox = jasmine.createSpy();

      var _threeFences = {
        'Rock of Gibraltar': {
          'coords': '36.125833, -5.343056',
          'fn': spyOnGibraltar
        },
        'Ernest Hemingway House': {
          'coords': '24.551130, -81.800790',
          'fn': spyOnHemingway
        },
        'Fort Knox': {
          'coords': '37.915499, -85.956172',
          'radius': '300m',
          'fn': spyOnFortKnox
        }
      };

      Locus.addFences(_threeFences);
      Locus.start();
    });

    afterEach(function() {
      Locus.removeFences();
    });

    it('should not match when outside a fence', function () {
      expect(spyOnGibraltar).not.toHaveBeenCalled();
    });

    it('should match when exactly on a location', function () {
      expect(spyOnGibraltar).not.toHaveBeenCalled();
      expect(spyOnHemingway).not.toHaveBeenCalled();

      // Visit a location
      geolocation.setCurrentPosition({coords:{latitude: 24.551130, longitude: -81.800790}, timestamp: new Date().getTime()});

      expect(spyOnGibraltar).not.toHaveBeenCalled();
      expect(spyOnHemingway).toHaveBeenCalled();
      expect(spyOnHemingway.calls.count()).toEqual(1);
    });

    xit('should match when inside a fence', function () {
      expect(spyOnGibraltar).not.toHaveBeenCalled();
      expect(spyOnHemingway).not.toHaveBeenCalled();

      // Visit a location
      geolocation.setCurrentPosition({coords:{latitude: 24.550640, longitude: -81.800630}, timestamp: new Date().getTime()});

      expect(spyOnGibraltar).not.toHaveBeenCalled();
      expect(spyOnHemingway).toHaveBeenCalled();
      expect(spyOnHemingway.calls.count()).toEqual(1);
    });
  });
})();