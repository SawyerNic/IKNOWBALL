const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const webpack = require('webpack-stream');
const nodemon = require('gulp-nodemon');
const eslint = require('gulp-eslint-new');
const webpackConfig = require('./webpack.config.js');

const sassTask = (done) => {
    gulp.src('./scss/**/*.scss') // Match all .scss files in the scss directory and subdirectories
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
    gulp.watch(['./client/**/*.js', './client/**/*.jsx', './server/components/**/*.jsx'], jsTask);
    gulp.watch(['./server/**/*.js', './server/**/*.jsx'], build);
    gulp.watch(['./views/**/*.handlebars'], build);
    nodemon({ 
        script: './server/app.js',
        tasks: ['lintTask'],
        watch: ['./server'],
    }).on('start', done);
}

const debugTask = (done) => {
    nodemon({
        script: './server/app.js',
        exec: 'node --inspect', // Enable the Node.js inspector
        tasks: ['lintTask'], // Run linting before restarting
        watch: ['./server', './client'], // Watch server and client files
    }).on('start', done);
};

const watchWithDebug = gulp.series(build, debugTask);


module.exports = {
	sassTask,
    build,
    jsTask,
    lintTask,
    watch,
    herokuBuild,
    debugTask,
    watchWithDebug,
};