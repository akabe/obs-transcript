const gulp = require('gulp');
const pleeease = require('gulp-pleeease');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

gulp.task('html', function () {
  return gulp
    .src(['src/*.html'])
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp
    .src(['src/styles/**/*.scss'])
    .pipe(sass({
      includePaths: ['node_modules']
    }))
    .pipe(concat('index.min.css'))
    .pipe(pleeease()) // autoprefixing
    .pipe(cleanCSS()) // minifying
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack', function () {
  return webpackStream(require('./webpack.config.js'), webpack)
    .pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.parallel('html', 'sass', 'webpack'));

gulp.task('watch', function () {
  gulp.watch('src/*.html', gulp.parallel('html'));
  gulp.watch('src/**/*.scss', gulp.parallel('sass'));
  gulp.watch('src/**/*.js', gulp.parallel('webpack'));
  gulp.watch('src/**/*.riot', gulp.parallel('webpack'));
});
