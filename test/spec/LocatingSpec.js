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

    it('shouldn\'t match twice when moving inside a fence', function () {
      expect(spyOnHemingway).not.toHaveBeenCalled();

      // Visit a location
      geolocation.setCurrentPosition({coords:{latitude: 24.551130, longitude: -81.800790}, timestamp: new Date().getTime()});
      geolocation.setCurrentPosition({coords:{latitude: 24.551140, longitude: -81.800780}, timestamp: new Date().getTime()});

      expect(spyOnHemingway).toHaveBeenCalled();
      expect(spyOnHemingway.calls.count()).toEqual(1);
    });

    it('should match twice when entering fence, leaving it and entering it again', function () {
      expect(spyOnHemingway).not.toHaveBeenCalled();

      // Visit a location
      geolocation.setCurrentPosition({coords:{latitude: 24.551130, longitude: -81.800790}, timestamp: new Date().getTime()});
      geolocation.setCurrentPosition({coords:{latitude: 0,         longitude: 0         }, timestamp: new Date().getTime()});
      geolocation.setCurrentPosition({coords:{latitude: 24.551130, longitude: -81.800790}, timestamp: new Date().getTime()});

      expect(spyOnHemingway).toHaveBeenCalled();
      expect(spyOnHemingway.calls.count()).toEqual(2);
    });

    it('should match when inside a fence', function () {
      expect(spyOnGibraltar).not.toHaveBeenCalled();
      expect(spyOnFortKnox).not.toHaveBeenCalled();

      // Visit a location inside a fence
      geolocation.setCurrentPosition({coords:{latitude: 37.915498, longitude: -85.956170}, timestamp: new Date().getTime()});
      expect(spyOnFortKnox.calls.count()).toEqual(1);

      // Leave location radius
      geolocation.setCurrentPosition({coords:{latitude: 37.913497, longitude: -85.953383}, timestamp: new Date().getTime()});
      expect(spyOnFortKnox.calls.count()).toEqual(1);

      // Enter location radius
      geolocation.setCurrentPosition({coords:{latitude: 37.914966, longitude: -85.954424}, timestamp: new Date().getTime()});
      expect(spyOnFortKnox.calls.count()).toEqual(2);

      // Make sure unrelated fences weren't called
      expect(spyOnGibraltar).not.toHaveBeenCalled();
    });
  });
})();