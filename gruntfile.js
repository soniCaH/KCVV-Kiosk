module.exports = function(grunt) {

	grunt.initConfig({
		clean: {
	  		css: ['build/css/*'],
	  		js: ['build/js/*'],
		},

		uglify: {
			dev: {
				options: {
					mangle: false,
					compress: false,
					beautify: true,
					sourceMap: true,
					screwIE8: true,
				},
				files: {
						'build/js/app.min.js': [
							'assets/js/footbel.js',
							'assets/js/instagram.js',
							'assets/js/kcvv.js',
					]
				}
			},
			dist: {
				options: {
					mangle: false,
					compress: true,
					beautify: false,
					sourceMap: false,
					screwIE8: true,
				},
				files: {
						'build/js/app.min.js': [
							'assets/js/footbel.js',
							'assets/js/instagram.js',
							'assets/js/kcvv.js',
					]
				}
		  	}	
		},
		sass: {
		  dev: {
		  	options: {
			   style: 'expanded',
			   compass: true,
			   sourcemap: 'auto',
			   debugInfo: true,
			   lineNumbers: true,
			},
		    files: {
		        'build/css/style.css': 'assets/sass/style.scss'
		    }
		  },
		  dist: {
		  	options: {
			   style: 'compressed',
			   compass: true,
			   sourcemap: 'none',
			},
		    files: {
		        'build/css/style.css': 'assets/sass/style.scss'
		    }
		  }
		},
		watch: {
			js: {
				files: ['assets/js/**/*.js'],
		    	tasks: ['uglify:dev'],
			},
			sass: {
				files: ['assets/sass/**/*.scss'],
				tasks: ['sass:dev'],
			},
		}
	});

	// RUN BY DEFAULT
	grunt.registerTask('default', ['build:dev', 'watch']);

	grunt.registerTask('build:dist', ['clean', 'sass:dist', 'uglify:dist']);
	grunt.registerTask('build:dev', ['clean', 'sass:dev', 'uglify:dev']);

	// RUN TASKS
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
};
