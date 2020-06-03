'use strict';

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const concatCss = require('gulp-concat-css');
const sync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');

function generateStyles() {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist'));
}

function generateHtml() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist/'));
}

function build() {
  generateHtml();
  generateStyles();
}

function browserSync() {
  sync.init({
    server: {
      baseDir: './dist'
    }
  });

  build();

  gulp.watch('./src/index.html', generateHtml);
  gulp.watch('./src/styles/**/*.scss', generateStyles);
  gulp.watch('./dist').on('change', sync.reload);
}

gulp.task('dev', browserSync);