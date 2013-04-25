module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bgShell: {
			_default: {
				bg: true
			},
			runNode: {
				cmd: 'node app.js',
				bg: false
			}
		},
		stylus: {
			compile: {
				files: {
					'static/css/webChat.css': 'stylus/webChat.styl'
				}
			},
		}
	});
	grunt.loadNpmTasks('grunt-bg-shell');
	grunt.loadNpmTasks('grunt-contrib-stylus');

	grunt.registerTask('start',['stylus', 'bgShell:runNode']);
};