var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var minifyCss = require('gulp-minify-css');
var handlebars = require('gulp-handlebars');
var wrap = require('gulp-wrap');
var declare = require('gulp-declare');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

gulp.task('default',['sass','tpl','js']);

gulp.task('sass', function () {
    return sass('dev/sass')
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
    	.pipe(minifyCss({compatibility: 'ie8'}))
    	.pipe(concat('app.css'))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('tpl', function(){
  gulp.src('dev/tpl/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'MDL.templates',
      noRedeclare: true,
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('dev/js/'));
});

gulp.task('js', function() {
  return gulp.src(['dev/lib/js/*.js','dev/js/**/*.js','dev/js/*.js'])
    .pipe(uglify())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('watch', function () {
    gulp.watch(['dev/sass/*.scss'], ['sass']);
    gulp.watch(['dev/lib/js/*.js','dev/js/**/*.js','dev/js/*.js'], ['js']);
    gulp.watch(['dev/tpl/*.hbs'], ['tpl']);
});