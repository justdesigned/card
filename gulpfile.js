"use strict";
const { watch, series, src, dest } = require("gulp");

function clean() {
  var clean = require("gulp-clean");
  return src("./build/**/*", { read: false }).pipe(clean());
}
function sass() {
  var sass = require("gulp-sass");
  return src("./src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./build/css/"));
}

function html() {
  return src("./src/*.html").pipe(dest("./build/"));
}

exports.clean = series(clean);
exports.sass = series(sass);
exports.html = series(html);
exports.build = series(clean, sass, html);

exports.default = function () {
  watch(["./src/sass/*.scss", "./src/*.html"], series(sass, html));
};
