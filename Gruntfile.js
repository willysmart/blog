module.exports = function(grunt) {

  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
	  
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
        server: {
          file: 'bin/www'
        }
      },
      mochaTest: {              
          	options: { reporter: 'spec' }, 
          	dev: ['test/*.js'],
  			regression:['regressiontest/**/*.js']
        },
        qunit: {
        	files: ['test/**/*.html']
        }
  });

  // Load the plugin that provides the "uglify" task.
/*  grunt.loadNpmTasks('grunt-contrib-uglify');*/

  // Default task(s).
//  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', [  'mochaTest:dev']);

  grunt.registerTask('dev', [  'develop'  ]);
  
};