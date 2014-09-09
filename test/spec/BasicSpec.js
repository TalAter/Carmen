(function() {
  var testFences = {
    'Vertical': {
      'coord': '39.456179, -0.346079',
      'fn': function() {}
    },
    'Azrieli': {
      'coord': '32.074194, 34.791949',
      'fn': function() {}
    },
    'Moscone': {
      'coord': '37.783944,-122.401289',
      'radius': '300m',
      'fn': function() {}
    }
  };

  describe('Locus', function() {
    'use strict';

    it('should exist in global namespace', function () {
      expect(window.Locus).toEqual(jasmine.any(Object));
    });

    it('should contain addFences method', function () {
      expect(window.Locus.addFences).toEqual(jasmine.any(Function));
    });

    it('should contain getFences method', function () {
      expect(window.Locus.getFences).toEqual(jasmine.any(Function));
    });

    it('should contain removeFences method', function () {
      expect(window.Locus.removeFences).toEqual(jasmine.any(Function));
    });

  });

  describe('Locus.getFences', function() {
    'use strict';

    it('should return an object', function() {
      var knownFences = Locus.getFences();
      expect(typeof knownFences).toBe('object');
      expect(Object.keys(knownFences).length).toBe(0);
    });

  });

  describe('Locus.addFences', function() {
    'use strict';

    afterEach(function() {
      Locus.removeFences();
    });

    it('should add fences when passed an object containing a few fences', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).not.toBeDefined();

      Locus.addFences(testFences);

      knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);
    });

    xit('should add fences without deleting previously added fences');

    xit('should overwrite previously added fences with same name');
  });

  describe('Locus.removeFences', function() {
    'use strict';

    beforeEach(function() {
      Locus.addFences(testFences);
    });

    afterEach(function() {
      Locus.removeFences();
    });

    it('should remove all fences passed to it by name in the first argument as an array', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).toBeDefined();
      expect(knownFences['Moscone']).toBeDefined();
      expect(knownFences['Vertical']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences(['Azrieli', 'Vertical']);

      knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).not.toBeDefined();
      expect(knownFences['Vertical']).not.toBeDefined();
      expect(knownFences['Moscone']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(1);
    });

    it('should remove one fence passed to it by name in the first argument as a string', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).toBeDefined();
      expect(knownFences['Moscone']).toBeDefined();
      expect(knownFences['Vertical']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences('Azrieli');

      knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).not.toBeDefined();
      expect(knownFences['Vertical']).toBeDefined();
      expect(knownFences['Moscone']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(2);
    });

    it('should remove all fences when called with no arguments', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).toBeDefined();
      expect(knownFences['Moscone']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences();

      knownFences = Locus.getFences();
      expect(knownFences['Azrieli']).not.toBeDefined();
      expect(knownFences['Moscone']).not.toBeDefined();
      expect(Object.keys(knownFences).length).toBe(0);
    });
  });
})();
