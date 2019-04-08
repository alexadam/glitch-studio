var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');

gulp.task('scripts', ['clean'], function() {
    return gulp.src([
            "bower_components/jquery/dist/jquery.min.js",
            "bower_components/jquery-ui/jquery-ui.min.js",
            "bower_components/codemirror/lib/codemirror.js",
            "bower_components/codemirror/addon/scroll/simplescrollbars.js",
            "bower_components/codemirror/addon/hint/show-hint.js",
            "bower_components/codemirror/addon/hint/javascript-hint.js",
            "bower_components/codemirror/addon/hint/anyword-hint.js",
            "utils/*.js"
        ])
        .pipe(uglify())
        .pipe(concat('dyn-glitch.all.min.js'))
        .pipe(gulp.dest('dist'));
});

gulp.task('css', ['clean'], function() {
    return gulp.src([
            "bower_components/codemirror/lib/codemirror.css",
            "bower_components/codemirror/addon/hint/show-hint.css",
            "bower_components/jquery-ui/themes/base/jquery-ui.min.css",
            "bower_components/codemirror/addon/scroll/simplescrollbars.css",
            "utils/*.css"
        ])
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist'));
});

gulp.task('assets', ['clean'], function() {
    return gulp.src('assets/**/*')
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('index', ['clean'], function() {
    return gulp.src('index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    del('dist/assets/*');
    return gulp.src(['dist/**/*'], {read: false})
        .pipe(clean({force: true}));
});

gulp.task('default', ['clean', 'css', 'assets', 'scripts', 'index']);
