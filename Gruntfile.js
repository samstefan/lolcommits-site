module.exports = function(grunt) {

  var fileSets =
      { stylus:
        { 'public/stylesheets/style.css': 'public/stylesheets/style.styl' }
      }

  // Project configuration.
  var config =
    { stylus:
      { compile:
        { options:
          { compress: false
          , data: { debug: true }
          }
        , files: fileSets.stylus
        }
      , deploy:
        { options: { compress: true }
        , files: fileSets.stylus
        }
      }
    , watch:
      { stylus:
        { files: ['public/stylesheets/**/*.styl']
        , tasks: 'stylus:compile'
        , options: { livereload: true }
        }
      }
    }

  grunt.initConfig(config)

  grunt.loadNpmTasks('grunt-contrib-stylus')
  grunt.loadNpmTasks('grunt-contrib-watch')

  // Tasks.
  grunt.registerTask('default', ['stylus:compile', 'watch'])
  grunt.registerTask('build', ['stylus:deploy'])

}