"use strict";
// ----
var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var rename = require("gulp-rename");
var server = require("browser-sync").create();
var run = require("run-sequence");
var del = require("del");
var jsmin = require("gulp-jsmin");

gulp.task('webp', () =>
    gulp.src('src/image.jpg')
    .pipe(webp())
    .pipe(gulp.dest('dist'))
);


gulp.task("copy", function() {
    return gulp.src([
            "source/fonts/**/*.{woff,woff2}",
            "source/img/**",
            "source/js/**"
        ], {
            base: "source"
        })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function() {
    return del("build");
});

gulp.task("style", function() {
    gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(gulp.dest("build/css"))
        .pipe(minify())
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest("build/css"));
});

gulp.task("images", function() {
    return gulp.src("source/img/**/*.svg")
        .pipe(imagemin([
            imagemin.optipng({ optimisationLevel: 3 }),
            imagemin.jpegtran({ progressive: true }),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest("source/img"));
})

gulp.task("webp", function() {
    return gulp.src("source/img/**/*.{png,jpg}")
        .pipe(webp({ quality: 90 }))
        .pipe(gulp.dest("source/img"));
});

gulp.task("sprite", function() {
    return gulp.src("build/img/{icon,logo}-*.svg")
        .pipe(svgstore({ inlineSvg: true }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});

gulp.task('minif', function() {
    return gulp.src("build/img/*-{twitter,search,fb,insta,cart}.svg")
        .pipe(imagemin([
            imagemin.svgo({
                plugins: [
                    { removeAttrs: { attrs: ['fill'] } }
                ]
            })
        ]))
        .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
    return gulp.src("source/*html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
});

gulp.task('jsmin', () =>
    gulp.src('source/js/script.js')
    .pipe(jsmin())
    .pipe(rename("script.min.js"))
    .pipe(gulp.dest('build/js'))
);

gulp.task("serve", function() {
    server.init({
        server: "build/"
    });

    gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
    gulp.watch("source/*.html");
});

gulp.task("build", function(done) {
    run(
        "clean",
        "copy",
        "minif",
        "style",
        "jsmin",
        "sprite",
        "html",
        done
    );
});