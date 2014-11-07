/*
 * grunt-regex-extract
 * https://github.com/mpau23/grunt-regex-extract
 *
 * Copyright (c) 2014 Miren Pau
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
  // load all npm grunt tasks
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
	
	//validate JS files and output test results
    jshint: {
      all: [
        'tasks/*.js',
		'<%= nodeunit.tests %>'
      ],
      options: {
        reporter: require('jshint-html-reporter'),
        reporterOutput: 'report/jshint-report.html',
        force:true,
		'-W099': true
      }
    },  
  
    // Configuration to be run (and then tested).
    regex_extract: {
      default_options: {
        options: {
          regex : "<script(.*|\n*)>(\s*|\n*)<\/script>",
		  modifiers: "ig",
          matchPoints: "1",
		  includePath : true
        },
        files: {
          'test/actual/default_options.txt': ['test/fixtures/example.html']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  
  grunt.registerTask('test', ['regex_extract', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  
};
