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
var babelify = require("babelify");
gulp.task('build', function() {
  browserify({
    debug: true,
    entries: ['./es6/index.es6'],
    extensions: ['.es6']
  })
    .transform(babelify)
    .bundle()
    .pipe(source('./js/index.js'))
    .pipe(gulp.dest('./'));
});

// sass
var sass = require('gulp-sass');
gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
      .pipe(sass({
        includePaths: require('node-bourbon').with('scss/**/*.scss')
      }))
      .pipe(gulp.dest('./css'));
});

// watch
gulp.task('watch', function(){
  gulp.watch('./es6/**/*.es6', ['build']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'sass'])
