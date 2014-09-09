var testFences = {
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
    expect(window.Locus).toBeDefined();
  });

  it('should contain addFences method', function () {
    expect(window.Locus.addFences).toBeDefined();
  });

  it('should contain getFences method', function () {
    expect(window.Locus.getFences).toBeDefined();
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

  it('should add fences when passed an object containing a few fences', function() {
    var knownFences = Locus.getFences();
    expect(knownFences['Azrieli']).not.toBeDefined();

    Locus.addFences(testFences);

    knownFences = Locus.getFences();
    expect(knownFences['Azrieli']).toBeDefined();
    expect(Object.keys(knownFences).length).toBe(2);
  });
});