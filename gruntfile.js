module.exports = function (grunt) {

	var mozjpeg = require('imagemin-mozjpeg');

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
						'assets/js/twitter.js',
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
						'assets/js/twitter.js',
						'assets/js/kcvv.js',
					]
				}
			}
		},
		csscomb: {
			files: { 
				'assets/style.scss': ['assets/style.scss'],
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
		imagemin: {
			img: {
				options: {
					optimizationLevel: 7,
					svgoPlugins: [{ removeViewBox: false }],
					use: [mozjpeg()]
				},
				files: [{
					expand: true,
					cwd: 'assets/images',
					src: ['**/*.{png,jpg,gif,svg}'],
					dest: 'build/images'
				}]
			}
		},
		watch: {
			js: {
				files: ['assets/js/**/*.js'],
				tasks: ['uglify:dev'],
			},
			sass: {
				files: ['assets/sass/**/*.scss'],
				tasks: ['csscomb', 'sass:dev'],
			},
			imagemin: {
				files: ['assets/images/**/*.{png,jpg,gif,svg}'],
				tasks: ['imagemin'],
			}
		}
	});

	// RUN BY DEFAULT
	grunt.registerTask('default', ['build:dev', 'watch']);

	grunt.registerTask('build:dist', ['clean', 'csscomb', 'sass:dist', 'uglify:dist', 'imagemin']);
	grunt.registerTask('build:dev', ['clean', 'csscomb', 'sass:dev', 'uglify:dev', 'imagemin']);

	// RUN TASKS
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-csscomb');
};
