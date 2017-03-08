module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['../javascript/**/*.js'], //location of javascript files
      options: {
        predef: ["document", "console", "alert", "event"],
        esnext: true, //'esnext' option is deprecated, use 'esversion'
        jquery: true, //makes the jquery not throw the errors
        globalstrict: true, //requires '"use strict";'' at global level
        undef: true, //throws error for variables that are left undefined
              //at instantiation; this catches lots of typo errors
      }
    },
    copy: { //for bootstrap and jquery - only need to do the first time.
      bootstrap: {
        expand: true,
        cwd: 'node_modules/bootstrap/dist/css',
        src: ['bootstrap.min.css'],
        dest: '../dist'
      },
      jquery: {
        expand: true,
        cwd: 'node_modules/jquery/dist',
        src: ['jquery.min.js'],
        dest: '../dist'
      }
    },
    watch: {
      javascripts: {
        files: ['../javascript/**/*.js'],
        tasks: ['jshint']
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
  grunt.registerTask('default', ['copy', 'jshint', 'watch']);
};