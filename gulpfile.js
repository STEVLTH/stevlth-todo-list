'use strict';

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const concatCss = require('gulp-concat-css');

const stylesPathSrc = './src/styles/**/*.scss';
const stylesPathDest = './dist/css';

function buildStyles() {
  return gulp.src(stylesPathSrc)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concatCss('styles/bundle.css'))
    .pipe(gulp.dest(stylesPathDest));
}

gulp.task('watch', function () {
  gulp.watch(stylesPathSrc, buildStyles);
});