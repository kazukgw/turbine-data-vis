var gulp = require('gulp');
var _ = require('lodash');

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

///// browserify-babel(6to5)
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var babelify = require("babelify");
gulp.task('build', function() {
  getBundler()
    .bundle()
    .pipe(source('./js/index.js'))
    .pipe(gulp.dest('./'));
});

// watchify
var watchify = require('watchify');
gulp.task('watchify', function(){
  var bundler = getBundler(watchify.args, true);
  bundler.on('update', _bundle);
  _bundle();
  function _bundle() {
    if(arguments[0]) {
      console.log('rebundle ====>', arguments[0]);
    }
    return bundler.bundle()
            .pipe(source('./js/index.js'))
            .pipe(gulp.dest('./'));
  }
});

function getBundler(opt, watch) {
  var _opt = {
    debug: true,
    basedir: __dirname,
    paths: ['./es6'],
    entries: ['./es6/index.es6'],
    extensions: ['.es6', '.jsx']
  };
  _.assign(_opt, opt);

  var bundler = browserify(_opt).transform(babelify);
  if(watch) {
    bundler = watchify(bundler);
  }
  return bundler;
}

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
gulp.task('watch', ['watchify'], function(){
  // gulp.watch('./es6/**/*.es6', ['build']);
  gulp.watch('./scss/**/*.scss', ['sass']);
});

gulp.task('default', ['build', 'sass'])
