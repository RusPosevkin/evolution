'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');

gulp.task('sass', function () {
  return gulp.src('./styles/sass/**/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./styles/css/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./styles/sass/**/*.scss', ['sass']);
});
