
import * as gulp from "gulp";
import * as load_plugins from "gulp-load-plugins";
import * as runSequence from "run-sequence";
import * as child_process from "child_process";
var spawn = child_process.spawn;

import * as webpackConfig from "./webpack.config.js";

const $ = load_plugins();
const tsFiles: string = "assets/javascripts/*.ts";
const sassFiles: string = "assets/stylesheets/*.{scss,sass}";
const imgFiles: string = "assets/images/*.{jpeg,jpg,png,svg,gif}";
const fontFiles: string = "assets/fonts/*.{ttf,otf,wtf}";

const tsProject = {
    module: "commonjs",
    noImplicitAny: false,
    removeComments: true,
    preserveConstEnums: true,
    sourceMap: false
};

gulp.task("ts:compile", () => {
    return gulp.src(tsFiles)
      .pipe($.plumber())
      .pipe($.typescript(tsProject))
      // .pipe(gulp.dest("tmp/js"))
      .pipe($.webpack(webpackConfig[0]))
      .pipe(gulp.dest("source/assets/js"));
});

gulp.task("sass:compile", () => {
    return gulp.src(sassFiles)
      .pipe($.plumber())
      // .pipe($.sass())
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

gulp.task("server", () => {
    var child = spawn("bundle", ["exec", "middleman"]);
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    return;
});

gulp.task("watch", () => {
    $.watch(tsFiles, () => gulp.run("ts:compile"));
    $.watch(sassFiles, () => gulp.run("sass:compile"));
    $.watch(imgFiles, () => gulp.run("img:copy"));
    $.watch(fontFiles, () => gulp.run("font:copy"));
});

gulp.task("default", () => {
    return runSequence(
        "ts:compile",
        "sass:compile",
        "img:copy",
        "font:copy",
        "watch",
        "server"
    );
});

