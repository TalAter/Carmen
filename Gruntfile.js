module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  // Default task(s).
  grunt.registerTask('default', []);

  // Test task
  grunt.registerTask('test', ['jasmine']);

};