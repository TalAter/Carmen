(function() {
  "use strict";

  var _threeFences = {
    'Rock of Gibraltar': {
      'coords': '36.125833, -5.343056',
      'fn': function() {}
    },
    'Ernest Hemingway House': {
      'coords': '24.551130, -81.800790',
      'fn': function() {}
    },
    'Fort Knox': {
      'coords': '37.915499, -85.956172',
      'radius': '300m',
      'fn': function() {}
    }
  };

  var _oneFence = {
    'Hagia Sophia': {
      'coords': '41.008580, 28.980176',
      'fn': function() {}
    }
  };

  var _twoFences = {
    'Sugarloaf Mountain': {
      'coords': '-22.949932, -43.155149',
      'fn': function() {}
    },
    'Millennium Dome': {
      'coords': '51.502817, 0.003117',
      'fn': function() {}
    }
  };

  describe('Carmen', function() {

    it('should exist in global namespace', function () {
      expect(window.Carmen).toEqual(jasmine.any(Object));
    });

    it('should contain addFences method', function () {
      expect(window.Carmen.addFences).toEqual(jasmine.any(Function));
    });

    it('should contain getFences method', function () {
      expect(window.Carmen.getFences).toEqual(jasmine.any(Function));
    });

    it('should contain removeFences method', function () {
      expect(window.Carmen.removeFences).toEqual(jasmine.any(Function));
    });

    it('should contain start method', function () {
      expect(window.Carmen.start).toEqual(jasmine.any(Function));
    });

  });

  describe('Carmen.getFences', function() {

    it('should return an object', function() {
      var knownFences = Carmen.getFences();
      expect(typeof knownFences).toBe('object');
      expect(Object.keys(knownFences).length).toBe(0);
    });

  });

  describe('Carmen.addFences', function() {

    afterEach(function() {
      Carmen.removeFences();
    });

    it('should add fences when passed an object containing a few fences', function() {
      var knownFences = Carmen.getFences();
      expect(knownFences['Sugarloaf Mountain']).not.toBeDefined();

      Carmen.addFences(_twoFences);

      knownFences = Carmen.getFences();
      expect(knownFences['Sugarloaf Mountain']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(2);
    });

    it('should add fences without deleting previously added fences', function() {
      var knownFences = Carmen.getFences();
      expect(Object.keys(knownFences).length).toBe(0);

      Carmen.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);

      Carmen.addFences(_oneFence);
      expect(Object.keys(knownFences).length).toBe(4);
      expect(knownFences['Hagia Sophia']).toBeDefined();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
    });

    it('should overwrite previously added fences with same name', function() {
      var knownFences = Carmen.getFences();
      expect(Object.keys(knownFences).length).toBe(0);

      Carmen.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);

      Carmen.addFences(_threeFences);
      expect(Object.keys(knownFences).length).toBe(3);
    });
  });

  describe('Carmen.removeFences', function() {

    beforeEach(function() {
      Carmen.addFences(_threeFences);
    });

    afterEach(function() {
      Carmen.removeFences();
    });

    it('should remove all fences passed to it by name in the first argument as an array', function() {
      var knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Carmen.removeFences(['Ernest Hemingway House', 'Rock of Gibraltar']);

      knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Rock of Gibraltar']).not.toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(1);
    });

    it('should remove one fence passed to it by name in the first argument as a string', function() {
      var knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Carmen.removeFences('Ernest Hemingway House');

      knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Rock of Gibraltar']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(2);
    });

    it('should remove all fences when called with no arguments', function() {
      var knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).toBeDefined();
      expect(knownFences['Fort Knox']).toBeDefined();
      expect(Object.keys(knownFences).length).toBe(3);

      Carmen.removeFences();

      knownFences = Carmen.getFences();
      expect(knownFences['Ernest Hemingway House']).not.toBeDefined();
      expect(knownFences['Fort Knox']).not.toBeDefined();
      expect(Object.keys(knownFences).length).toBe(0);
    });
  });
})();
