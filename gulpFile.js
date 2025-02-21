const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint-new');
const webpackConfig = require('./webpack.config.js');

const sassTask = (done) => {
    gulp.src('./scss/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
    done();
};

const jsTask = (done) => {
    gulp.src(['./client/**/*.jsx', './server/components/**/*.jsx'])
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest('./dist'));

    done();
};

const lintTask = (done) => {
    gulp.src('./server/**/*.js')
        .pipe(eslint({fix: true}))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    
    done();
}

const build = gulp.parallel(sassTask, jsTask, lintTask);
const herokuBuild = gulp.parallel(sassTask, jsTask);

const watch = (done) => {
    gulp.watch('./scss', sassTask);
    gulp.watch(['./client/**/*.js', './client/**/*.jsx', './server/components/**/*.jsx'], build);
    gulp.watch(['./server/**/*.js', './server/**/*.jsx'], build);
    nodemon({ 
        script: './server/app.js',
        tasks: ['lintTask'],
        watch: ['./server'],
    }).on('start', done);
}

module.exports = {
	sassTask,
    build,
    jsTask,
    lintTask,
    watch,
    herokuBuild,
};