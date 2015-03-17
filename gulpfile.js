var gulp = require('gulp');

// local-server
var webserver = require('gulp-webserver');
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      // livereload: true,
      directoryListing: true,
      open: true,
      port: 8888
    }));
});

// browserify-babel(6to5)
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var to5ify = require("6to5ify");
gulp.task('build', function() {
  browserify({
    debug: true,
    entries: ['./es6/index.es6'],
    extensions: ['.es6']
  })
    .transform(to5ify)
    .bundle()
    .pipe(source('./js/index.js'))
    .pipe(gulp.dest('./'));
});

// watch
gulp.task('watch', function(){
  gulp.watch('./es6/*', ['build']);
});

gulp.task('default', ['build'])
