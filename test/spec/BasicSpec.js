(function() {
  var _threeFences = {
    'Rock of Gibraltar': {
      'coord': '36.125833, -5.343056',
      'fn': function() {}
    },
    'Ernest Hemingway House': {
      'coord': '24.551130, -81.800790',
      'fn': function() {}
    },
    'Fort Knox': {
      'coord': '37.915499, -85.956172',
      'radius': '300m',
      'fn': function() {}
    }
  };

  var _oneFence = {
    'Hagia Sophia': {
      'coord': '41.008580, 28.980176',
      'fn': function() {}
    }
  };

  var _twoFences = {
    'Sugarloaf Mountain': {
      'coord': '-22.949932, -43.155149',
      'fn': function() {}
    },
    'Millennium Dome': {
      'coord': '51.502817, 0.003117',
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
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();

      Locus.addFences(_threeFences);

      knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);
    });

    it('should add fences without deleting previously added fences', function() {
      var knownFences = Locus.getFences();
      expect(Object.keys(knownFences).length).toBe(0);

      Locus.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.addFences(_oneFence);
      expect(Object.keys(knownFences).length).toBe(4);
      expect(knownFences['Hagia Sophia']).toBeDefined();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
    });

    it('should overwrite previously added fences with same name', function() {
      var knownFences = Locus.getFences();
      expect(Object.keys(knownFences).length).toBe(0);

      Locus.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);
    });
  });

  describe('Locus.removeFences', function() {
    'use strict';

    beforeEach(function() {
      Locus.addFences(_threeFences);
    });

    afterEach(function() {
      Locus.removeFences();
    });

    it('should remove all fences passed to it by name in the first argument as an array', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences(['Ernest Hemingway House', 'Rock of Gibraltar']);

      knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Rock of Gibraltar']).not.toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(1);
    });

    it('should remove one fence passed to it by name in the first argument as a string', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences('Ernest Hemingway House');

      knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(2);
    });

    it('should remove all fences when called with no arguments', function() {
      var knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Locus.removeFences();

      knownFences = Locus.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Fort Knox']).not.toBeDefined();
      expect(Object.keys(knownFences).length).toBe(0);
    });
  });
})();
