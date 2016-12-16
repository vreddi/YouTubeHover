// Require these dependencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

var paths = {
    controllers: 'controllers/*/*.js',
    options_scripts: ['options/modules/*/*.js', '!options/modules/min/*.js'],
    options_styles: ['options/modules/*/*.scss', '!options/modules/min/*.css'],
}

gulp.task('controllers', function() {
    return gulp.src(paths.controllers)
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('controllers/'))
      .pipe(uglify())
      .pipe(rename("controllers.min.js"))
      .pipe(gulp.dest('controllers/'));
});

gulp.task('optionsScripts', function() {
    return gulp.src(paths.options_scripts)
      .pipe(concat('modules.js'))
      .pipe(gulp.dest('options/modules/'))
      .pipe(uglify())
      .pipe(rename("modules.min.js"))
      .pipe(gulp.dest('options/modules/min/'));
});

gulp.task('optionsStyles', function() {
    return gulp.src(paths.options_styles)
      .pipe(concat('modules.scss'))
      .pipe(gulp.dest('options/modules/'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('options/modules/'))
      .pipe(cleanCSS())
      .pipe(rename("modules.min.css"))
      .pipe(gulp.dest('options/modules/min/'));
});

// Watch task
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('controllers/*/*.js', ['controllers']);
    gulp.watch('options/modules/*/*.js', ['optionsScripts']);
    gulp.watch('options/modules/*/*.scss', ['optionsStyles']);
 });

// Default Task
gulp.task('default', ['watch', 'controllers', 'optionsScripts', 'optionsStyles']);

