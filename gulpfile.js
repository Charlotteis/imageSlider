// Include gulp
var gulp = require("gulp");

// Include gulp plugins
var jshint = require("gulp-jshint");
var livereload = require("gulp-livereload");
var connect = require("gulp-connect");


// Local webserver task
gulp.task("webserver", function() {
    connect.server();
});

// JS Lint Task
gulp.task("lint", function() {
    return gulp.src(["js/app.js", "js/slider.jquery.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"))
        .pipe(livereload());
});

// Reloading index.html
gulp.task("html", function() {
    return gulp.src([
        "./index.html"
    ])
    .pipe(livereload());
});

gulp.task("css", function() {
    return gulp.src([
        "css/style.css"
    ])
    .pipe(livereload());
});

// Watch files for changes
gulp.task("watch", function() {
    // var server = livereload();
    livereload.listen();

    gulp.watch("js/app.js", ["lint"])
    gulp.watch("./index.html", ["html"])
    gulp.watch("css/style.css", ["css"])

})

// Default gulp task
gulp.task("default", ["webserver", "lint", "watch"]);
