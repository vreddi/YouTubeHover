// Require these dependencies
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');

var paths = {
    controllers: 'controllers/*/*.js',
    options_module_scripts: ['options/modules/*/*.js', '!options/modules/min/*.js'],
    options_module_styles: ['options/modules/*/*.scss', '!options/modules/min/*.css'],
    options_style: 'options/options.scss'
}

gulp.task('controllers', function() {
    return gulp.src(paths.controllers)
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('controllers/'))
      .pipe(uglify())
      .pipe(rename("controllers.min.js"))
      .pipe(gulp.dest('controllers/'));
});

gulp.task('optionsModuleScripts', function() {
    return gulp.src(paths.options_module_scripts)
      .pipe(concat('modules.js'))
      .pipe(gulp.dest('options/modules/'))
      .pipe(uglify())
      .pipe(rename("modules.min.js"))
      .pipe(gulp.dest('options/modules/min/'));
});

gulp.task('optionsModuleStyles', function() {
    return gulp.src(paths.options_module_styles)
      .pipe(concat('modules.scss'))
      .pipe(gulp.dest('options/modules/'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('options/modules/'))
      .pipe(cleanCSS())
      .pipe(rename("modules.min.css"))
      .pipe(gulp.dest('options/modules/min/'));
});

gulp.task('optionsStyle', function() {
    return gulp.src(paths.options_style)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('options/'))
});

// Watch task
gulp.task('watch', function() {
    // Watch .js files
    gulp.watch('controllers/*/*.js', ['controllers']);
    gulp.watch('options/modules/*/*.js', ['optionsModuleScripts']);
    gulp.watch('options/modules/*/*.scss', ['optionsModuleStyles']);
    gulp.watch('options/options.scss', ['optionsStyle']);
 });

// Default Task
gulp.task('default', ['watch', 'controllers', 'optionsModuleScripts', 'optionsModuleStyles', 'optionsStyle']);

