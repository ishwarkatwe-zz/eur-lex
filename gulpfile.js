/* 
 * Gulp Task Manager Configurations
 */

// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

//Path config http://localhost:8080/
gulp.task('webserver', function () {
    connect.server({
        livereload: true
    });
});

// Lint Task
gulp.task('lint', function () {
    return gulp.src('assets/js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function () {
    return gulp.src('assets/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('assets/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp.src('assets/js/*.js')
            .pipe(concat('assets/js/all.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest('dist/assets/js'));
});

//Html Minify
gulp.task('html-minify', function () {
    return gulp.src(['./*.html', '!node_modules/**', '!dist/**'])
            .pipe(htmlmin({collapseWhitespace: true}))
            .pipe(gulp.dest('dist'))
});

//Css Minify
gulp.task('css-minify', function () {
    return gulp.src('assets/css/*.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('dist/assets/css'));
});

//Image Compress
gulp.task('image-min', function () {
    return gulp.src('assets/img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('dist/assets/img'));
});

// Watch Files For Changes
gulp.task('watch', function () {
    gulp.watch('assets/js/*.js', ['lint', 'scripts']);
    gulp.watch('assets/scss/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch', 'html-minify', 'css-minify', 'image-min', 'webserver']);
