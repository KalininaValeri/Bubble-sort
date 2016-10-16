var gulp = require('gulp');
var gutil = require('gulp-util');
var less = require('gulp-less');

gulp.task('default', ['watch']);

gulp.task('less', function () {
    return gulp.src(['./less/style.less', './src/less/media.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.start('less');
    gulp.watch('./less/**/*.less', ['less']);
});