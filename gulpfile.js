'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');
const sass = require("gulp-sass");
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const replace = require('gulp-replace');
const cssnano = require('cssnano');
const cssVersion = new Date().getTime();
const sassFiles = 'src/sass/**/*.scss';
const jsFiles = 'src/js/**/*.js';
const images = 'src/assets/*';

// Creates a browserSync server for all files in this directory.
browserSync.init({
    server: {
        baseDir: "./"
    }
});

function scssTask() {
    return src(sassFiles)
        .pipe(sourcemaps.init()) // Lets us see the CSS source code in the inspector
        .pipe(sass()) // Transpiles SCSS to CSS
        .pipe(postcss([autoprefixer(), cssnano()])) // Add browser prefixes and minify
        .pipe(sourcemaps.write('.')) // Create sourcemap in the same place as the CSS
        .pipe(dest('build')) // Put everything in the build directory
        .pipe(browserSync.stream());
}

function jsTask() {
    return src(jsFiles)
        .pipe(terser())
        .pipe(concat('index.js')) // Combine all JS files together into index.js
        .pipe(dest('build')) // Put everything in the build directory
        .pipe(browserSync.stream()); // Update the browser
}

function imageTask() {
    return src(images).pipe(dest('build/assets'));
}

function preventCachingTask() {
    // Looks in the index.html file for any files that have a 'v=' tag,
    // and updates the version number to prevent browsers from caching
    // old versions of the file. 
    return src(['index.html'])
        .pipe(replace(/v=\d+/g, 'v=' + cssVersion))
        .pipe(dest('.'));
}

function watchTask() {
    // Watch for changes in any SCSS or JS files, and run the scssTask,
    // jsTask, and preventCachingTask functions whenever there is a change.
    watch(
        [sassFiles, jsFiles, images],
        series(
            parallel(scssTask, jsTask, imageTask),
            preventCachingTask
        )
    );
}

// Export everything to run when you run 'gulp'
exports.default = series(
    parallel(scssTask, jsTask, imageTask),
    preventCachingTask,
    watchTask
);