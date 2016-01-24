var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    sass = require('gulp-sass'),
    
    chalk = require('chalk');


// SASS Task
function sassTask() {
    console.log(chalk.green.bold('COMPILING SCSS...'));
    
    gulp.src('./scss/photon.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./ui'));
}

gulp.task('sass', sassTask);
gulp.task('sass-watch', function () {
    gulpWatch('./scss/**/*.scss', sassTask); 
});