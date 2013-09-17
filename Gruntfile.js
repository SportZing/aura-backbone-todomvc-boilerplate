/*global module:true*/

var yeomanConfig = {
  app: 'app',
  dist: 'dist'
};

module.exports = function (grunt) {

  'use strict';

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    yeoman: yeomanConfig,

    // grunt-express will serve the files from the folders listed in `bases`
    // on specified `port` and `hostname`
    express: {
      app: {
        options: {
          port: 9000,
          hostname: "*",
          server: 'server',
          bases: ['app'], 
          livereload: true
        }
      },
      test: {
        options: {
          port: 9001,
          hostname: "*",
          bases: ['spec','app'],
          livereload: true
        }
      }
    },
 
    // grunt-open will open your browser at the project's URL
    open: {
      app: {
        url: 'http://localhost:<%= express.app.options.port %>'
      },
      test: {
        url: 'http://localhost:<%= express.test.options.port %>'
      }
    },

    // grunt-watch will monitor the projects files
    watch: {
      aura_components: {
        files: ['app/aura_components/**/*.js'],
        tasks: ['concat']
      },
      handlebars: {
        files: ['app/aura_components/**/*.hbs'],
        tasks: ['handlebars']
      },
      compass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['compass']
      },
      livereload: {
        options: {
          livereload: true 
        },
        files: [
          'app/*.html',
          '{.tmp,app}/styles/*.css',
          '{.tmp,app}/scripts/*.js',
          'app/images/*.{png,jpg,jpeg}'
        ]
      }
    },

    compass: {
      options: {
        sassDir : 'app/styles',
        cssDir: 'app/styles',
        imagesDir: 'app/images',
        javascriptsDir: 'app/scripts',
        fontsDir: 'app/styles/fonts',
        importPath: 'app/bower_components',
        force: true,
        relativeAssets: true
      },
      main: {}
    },

    jshint: {
      all: [
        'app/scripts/[^templates].js',
        'app/aura_components/**/*.js'
      ]
    },

    handlebars: {
      compile: {
        files: {
          "app/scripts/templates.js" : ["app/aura_components/**/*.hbs"]
        },
        options: {
          wrapped: true,
          namespace: "Handlebars.templates",
          processName: function (filename) {
            return filename.replace(/^app\/aura_components\//, '').replace(/\.hbs$/, '');
          }
        }
      }
    },

    // Cleans up generated assets
    clean: {
      dist: ['.tmp', 'dist/*'],
      server: '.tmp'
    },

    // Minifies scripts and copies into dist
    uglify: {
      dist: {
        files: {
          'dist/application.js': [
            'app/scripts/*.js'
          ]
        }
      }
    },

    // Replaces references in HTML to non-optimized scripts
    // and styles with refence to optimized assets
    useminPrepare: {
      html: 'index.html'
    },
    usemin: {
      html: ['dist/*.html'],
      css: ['dist/styles/*.css']
    },

    // Minify and copy images into dist
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'app/images',
          src: '*.{png,jpg,jpeg}',
          dest: 'dist/images'
        }]
      }
    },

    // Concatenate and minify CSS files into dist
    cssmin: {
      dist: {
        files: {
          'dist/css/application.css': [
            // 'app/styles/*.css'      // proper order may not be preserved
            'app/styles/global.css',
            'app/styles/button.css',
            'app/styles/todoapp.css'
          ]
        }
      }
    },

    // Copy any remaining files into dist
    copy: {
      dist: {
        files: [
          { cwd: 'app/', dest: 'dist/', src: ['robots.txt'], expand: true }
        ]
      }
    },

    // Minify all html files and copy into dist
    htmlmin: {
      dist: {
        options: {
          removeComments: false,
          removeCommentsFromCDATA: true,
          collapseWhitespace: false,
          collapseBooleanAttributes: true,
          removeAttributeQuotes: false,
          removeRedundantAttributes: false,
          useShortDoctype: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false
        },
        files: [{
          expand: true,
          cwd: 'app',
          src: '*.html',
          dest: 'dist'
        }]
      }
    },

    // Concatenate JS files into single file
    concat: {
      options: {
        separator: "\n\n\n\n//--------\n\n\n"
      },
      dist: {
        src: ['app/aura_components/**/*.js'],
        dest: 'app/scripts/aura_components.js'
      }
    },

    // mocha: {
    //   // Test all files ending in .html anywhere inside the test directory.
    //   browser: ['test/**/*.html'],
    //   options: {
    //     reporter: 'Nyan', // Duh!
    //     run: true
    //   }   
    // }
    mocha: {
      all: {
        options: {
          urls: ['http://localhost:<%= express.test.options.port %>/index.html']
        },
        dist: {},
      }
    },

  });

  // Creates the `server` task which launches a web server
  // to host content, initiates live reload features, opens
  // a web browser with the site, and starts watching for
  // assets to change so it can reload the page 
  grunt.registerTask('server', [
    'express:app',
    'open:app',
    'watch'
  ]);

  // 
  grunt.registerTask('test', [
    'clean:server',
    'express:test',
    'open:test',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'compass',
    'concat',
    'jshint',
    'handlebars',
    'useminPrepare',
    'uglify',
    'imagemin',
    'htmlmin',
    'cssmin',
    'usemin',
    'copy'
  ]);

  grunt.registerTask('default', ['build']);

};
