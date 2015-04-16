gruntConfig = (grunt) ->
  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    browserify:
      options:
        transform: ['reactify']
      server:
        files:
          '.server/js/app.js': ['src/js/**/*.{js,jsx}']
      building:
        files:
          '.building/js/app.js': ['src/js/**/*.{js,jsx}']

    clean:
      dist: ['dist']
      server: ['.server']
      building: ['.building', '.tmp']
      cache: ['.sass-cache']

    compass:
      dist:
        options:
          sassDir: 'src/css'
          cssDir: 'dist/css'
          environment: 'production'
          outputStyle: 'compressed'
          bundleExec: true
      server:
        options:
          sassDir: 'src/css'
          cssDir: '.server/css'
          outputStyle: 'expanded'
          bundleExec: true

    connect:
      options:
        port: 8000
        base: ['.server', 'src']
        open: 'http://localhost:8000'
        middleware: (connect, options) ->
          options.base = [options.base] unless Array.isArray(options.base)
          middlewares = [require('grunt-connect-proxy/lib/utils').proxyRequest]
          options.base.forEach (base) ->
            middlewares.push(connect.static(base))
          directory = options.directory or options.base[options.base.length - 1]
          middlewares.push(connect.directory(directory))
          middlewares.push (req, res, next) ->
            console.log req.url
            next()
          middlewares
      server:
        proxies: [
          context: '/services'
          host: 'localhost'
          port: 9000
        ]
        options:
          livereload: true

    copy:
      dist:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*', '!lib/**/*', '!**/*.{sass,scss,js}']
          filter: 'isFile'
          dest: 'dist/'
        ]
      building:
        files: [
          expand: true
          cwd: 'src'
          src: ['**/*.js', '**/*.html']
          filter: 'isFile'
          dest: '.building'
        ]
      usemin:
        files: [
          expand: true
          cwd: '.building'
          src: ['**/*.html']
          filter: 'isFile'
          dest: 'dist'
        ]

    htmlmin:
      options:
        removeComments: true
        removeCommentsFromCDATA: true
        removeCDATASectionsFromCDATA: true
        collapseWhitespace: true
        conservativeCollapse: true
        collapseBooleanAttributes: true
        removeOptionalTags: true
      dist:
        files: [
          expand: true
          cwd: 'dist'
          src: ['**/*.html']
          dest: 'dist'
        ]

    watch:
      options:
        spawn: false
        forever: true
        livereload: true
      compass:
        files: 'src/**/*.+(sass|scss)'
        tasks: 'compass:server'
      html:
        files: 'src/**/*.html'
      css:
        files: 'src/**/*.css'
      js:
        files: 'src/**/*.{js,jsx}'
        tasks: 'browserify:server'

    filerev:
      dist:
        src: [
          'dist/css/**/*.css'
          'dist/fonts/**/*.*'
          'dist/js/**/*.js'
        ]

    useminPrepare:
      html: ['.building/**/*.html']

    usemin:
      html: ['dist/**/*.html']
      css: ['dist/css/**/*.css']
      options:
        assetsDirs: ['dist', 'dist/fonts', 'dist/img']

  grunt.registerTask 'preServer',
      ['compass:server','browserify:server']

  # preCompile: compile the files to optimize
  grunt.registerTask 'preCompile',
      ['copy:building', 'copy:dist', 'compass:dist','browserify:building']

  grunt.registerTask 'compile', 'Compile & optimize the codes',
      ['preCompile', 'optimize']

  grunt.registerTask 'optimize', 'Optimize JS files',
      ['useminPrepare', 'copy:usemin', 'concat:generated'
       'uglify:generated', 'filerev', 'usemin', 'htmlmin']

  grunt.registerTask 'build', 'Build the code for production',
      ['bower:install', 'clean:dist', 'clean:server'
       'compile', 'clean:building', 'clean:cache']

  grunt.registerTask 'serve', 'Start a preview server',
      ['clean:dist', 'clean:server', 'preServer'
       'configureProxies:server', 'connect:server', 'watch']

  grunt.registerTask 'default', 'UT (when has) & build',
      ['build']


module.exports = gruntConfig
