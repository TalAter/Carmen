module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'src/locus.js'
      ],
      options: {
        "node"      : true,
        "browser"   : true,
        "devel"     : false,
        "camelcase" : true,
        "curly"     : true,
        "latedef"   : true,
        "unused"    : true,
        "trailing"  : true,
        "eqeqeq"    : true,
        "eqnull"    : true,
        "evil"      : false,
        "forin"     : true,
        "immed"     : true,
        "laxbreak"  : false,
        "newcap"    : true,
        "noarg"     : true,
        "noempty"   : false,
        "nonew"     : true,
        "onevar"    : false,
        "plusplus"  : false,
        "undef"     : true,
        "sub"       : true,
        "strict"    : true,
        "white"     : false,
        "indent"    : 2
      }
    },
    uglify: {
      options: {
        preserveComments: 'some'
      },
      all: {
        files: {
          'dist/locus.min.js': ['src/locus.js']
        }
      }
    },
    jasmine: {
      dist: {
        src: 'src/*.js',
        options: {
          specs: 'test/spec/spec.js',
          outfile: 'test/SpecRunner.html'
        }
      }
    }
  });

  // Load NPM Tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'uglify']);

  // Test task
  grunt.registerTask('test', ['jshint', 'jasmine']);

};