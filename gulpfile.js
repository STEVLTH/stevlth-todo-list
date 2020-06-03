'use strict';

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const concatCss = require('gulp-concat-css');
const sync = require('browser-sync').create();

const stylesPathSrc = './src/styles/**/*.scss';
const stylesPathDest = './dist';

function generateStyles() {
  return gulp.src(stylesPathSrc)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(gulp.dest(stylesPathDest));
}

function generateHtml() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
}

function browserSync() {
  sync.init({
    server: {
      baseDir: './dist'
    }
  });


  generateHtml();
  generateStyles();

  gulp.watch('./src/index.html', generateHtml);
  gulp.watch(stylesPathSrc, generateStyles);
  gulp.watch('./dist').on('change', sync.reload);
}

gulp.task('dev', browserSync);