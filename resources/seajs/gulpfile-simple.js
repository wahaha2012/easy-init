var gulp = require("gulp");
var less = require("gulp-less");

gulp.task("less", function(){
    return gulp.src(["less/*.less"])
            .pipe(less())
            .pipe(gulp.dest("css/"));
});

gulp.task("copyimages", function(){
    return gulp.src(["less/img/**/*.*"], {base: "./less"})
            .pipe(gulp.dest("css/"));
});

gulp.task("watch", function(){
    gulp.watch(["less/**/*.less"], ["less"]);
    
    gulp.watch(["less/img/**/*.*"], ["copyimages"]);
});

gulp.task("default", ["less", "copyimages"]);