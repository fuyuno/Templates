import gulp from "gulp";
import load_plugins from "gulp-load-plugins";
import runSequence from "run-sequence";

import webpackConfig from "./webpack.config.js";

const $ = load_plugins();
const jsFiles = "assets/javascripts/**/*.js";
const sassFiles = "assets/stylesheets/**/*.{scss,sass}";
const imgFiles = "assets/images/**/*.{jpeg,jpg,png,svg,gif}";
const fontFiles = "assets/fonts/**/*.{eot,svg,ttf,otf,wtf,woff,woff2}";

gulp.task("js:compile", () => {
    return gulp.src(jsFiles)
      .pipe($.plumber())
      .pipe($.webpack(webpackConfig[0]))
      .pipe(gulp.dest("source/assets/js"));
});

gulp.task("sass:compile", () => {
    return gulp.src(sassFiles)
      .pipe($.plumber())
      .pipe($.webpack(webpackConfig[1]))
      .pipe(gulp.dest("source/assets/css"));
});

gulp.task("img:copy", () => {
    return gulp.src(imgFiles)
      .pipe(gulp.dest("source/assets/img"));
});

gulp.task("font:copy", () => {
    return gulp.src(fontFiles)
      .pipe(gulp.dest("source/assets/fonts"));
});

gulp.task("watch", () => {
    $.watch(jsFiles, () => gulp.run("js:compile"));
    $.watch(sassFiles, () => gulp.run("sass:compile"));
    $.watch(imgFiles, () => gulp.run("img:copy"));
    $.watch(fontFiles, () => gulp.run("font:copy"));
});

gulp.task("build", () => {
    return runSequence(
        "js:compile",
        "sass:compile",
        "img:copy",
        "font:copy"
    );
});

gulp.task("default", () => {
    return runSequence(
        "js:compile",
        "sass:compile",
        "img:copy",
        "font:copy",
        "watch"
    );
});
