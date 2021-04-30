'use strict';

const { src, dest, parallel, series, watch } = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const server = browserSync.create();
const fileinclude = require('gulp-file-include');
const cssmin = require('gulp-cssmin');
const imagemin = require('gulp-imagemin');
const browserify = require('gulp-browserify');

function browserReload(done) {
	server.reload();
	done();
}

function browserServe(done) {
	server.init({
		server: 'build',
		open: 'external'
	});
	done();
}

// Clean Build
function clean() {
	return del(['build']);
}

function img() {
	return src(['dev/assets/img/**'
	], { base: './dev'})
	.pipe(dest('build'));
}
// Minify Image
function imgmin() {
	return src('dev/assets/img/*')
	.pipe(imagemin([
		imagemin.optipng({optimizationLevel: 8}),
		imagemin.svgo({
			plugins: [
				{removeViewBox: true},
				{cleanupIDs: false}
			]
		})
		]))
	.pipe(dest('build/assets/img'))
}


function jsConcat() {
	//jsLibs();
	return src([
		'dev/assets/js/imports.js',
		'dev/assets/js/functions.js'
	])
	.pipe(maps.init())
	.pipe(concat('main.js'))
	.pipe(browserify({
		insertGlobals : true
	}))
	.pipe(maps.write('./'))
	.pipe(dest('build/assets/js'));
}

// JS Min
function jsMinify() {
	return src('build/assets/js/main.js')
	.pipe(uglify())
	.pipe(rename('main.min.js'))
	.pipe(dest('build/assets/js'));
}

// CSS SASS Compile
function cssCompile() {
	return src('dev/assets/css/main.scss')
	.pipe(maps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(autoprefixer())
	.pipe(maps.write('./'))
	.pipe(dest('build/assets/css'))
	.pipe(server.stream());
}

// CSS Min
function cssMinify() {
	return src('build/assets/css/main.css')
    .pipe(cssmin())
    .pipe(rename('main.min.css'))
    .pipe(dest('build/assets/css'));
}

// HTML CS JS HTML
function watchCssJsHtml() {
	watch('dev/assets/css/**/*.scss', cssCompile);
	watch('dev/assets/js/*.js', series(jsConcat, browserReload));
	watch('dev/assets/img/**', series(img, browserReload));
}

const js   = series(jsConcat, jsMinify);
const css  = series(cssCompile, cssMinify);
const watchFiles = watchCssJsHtml;
const ServeFiles = browserServe;
const build      = parallel( css, js, img);
const serveBuild = parallel(css, js, img);


exports.js      = series(jsConcat, jsMinify);
exports.css     = series(cssCompile, cssMinify);
exports.clean   = clean;
exports.imgmin  = imgmin;
exports.build   = series(clean, parallel( css, js, img));
exports.serveBuild   = parallel( cssCompile, jsConcat, img);

exports.serve   = series(serveBuild, parallel(watchFiles, ServeFiles));
exports.default = build;