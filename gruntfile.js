module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			options: {
      		mangle: false
    		},
		  	my_target: {
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
		  dist: {
		  	options: {
			   style: 'compressed',
			   compass: true
			},
		    files: {
		        'build/css/style.css': 'assets/sass/style.scss'
		    }
		  }
		},
		watch: {
			js: {
				files: ['assets/js/**/*.js'],
		    	tasks: ['uglify'],
			},
			sass: {
				files: ['assets/sass/**/*.scss'],
				tasks: ['sass:dist'],
			},
		}
	});

	// RUN BY DEFAULT
	grunt.registerTask('default', ['watch']);

	// RUN TASKS
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-uglify');

};
