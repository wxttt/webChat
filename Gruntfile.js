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
			},
			startWatch: {
				cmd: 'grunt watch',
				bg: true
			}
		},
		stylus: {
			compile: {
				files: {
					'static/css/webChat.css': 'stylus/webChat.styl'
				}
			},
		},
		watch: 	{
			files: ['stylus/*.styl'],
			tasks: ['stylus'],
			options:{
				nospawn: false,
				interrrupt: true
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-bg-shell');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default',['stylus', 'bgShell:startWatch', 'bgShell:runNode']);
	
	grunt.event.on('watch', function(action, filepath) {
  		grunt.log.writeln(filepath + ' has ' + action);
	});
};