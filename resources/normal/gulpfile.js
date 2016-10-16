var gulp = require("gulp");
var less = require("gulp-less");
var cssmin = require("gulp-cssmin");
var uglify = require("gulp-uglify");
var includer = require('gulp-htmlincluder');
var hashCreator = require('gulp-hash-creator');

var template = '(function(global){\n\
    var config = {\n\
        {{{hashList}}},\n\
        "jquery": "lib/jquery.min.js"\n\
    };\n\n\
    window.version = function(key){\n\
        return !key? config: config[key];\n\
    }\n\
})(this);';

//bower source
/*gulp.task('copyBowerSource', function(){
    gulp.src(['bower_components/underscore/underscore.js'])
        .pipe(gulp.dest('js/lib'));
});*/

gulp.task("less", function(){
    return gulp.src(["less/*.less"])
            .pipe(less())
            .pipe(gulp.dest("css/"));
});

gulp.task("copyimages", function(){
    return gulp.src(["less/img/**/*.*"], {base: "./less"})
            .pipe(gulp.dest("css/"));
});

//copy html
gulp.task('buildhtml', function(){
    gulp.src('html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('./'));
});

gulp.task("watch", function(){
    gulp.watch(["less/**/*.less"], ["less"]);
    
    gulp.watch(["less/img/**/*.*"], ["copyimages"]);

    gulp.watch('./html/**/*.html', ["buildhtml"]);
});

//get static files version
gulp.task("getStaticVersion", function(){
    return gulp.src("js/**/*.js")
            .pipe(hashCreator({
                forceUpdate: true,
                length:6,
                delimiter: ",\n\t\t",
                output: 'js/version.js',
                outputTemplate: template,
                format: function (obj) {
                    return '"' + obj.path.replace(/(^js\/)|(\.js$)/g,"") + '": "' + obj.path.replace(/^js\//,"") +"?v"+ obj.hash + '"';
                    // return '"' + obj.path.replace(/(^js\/)|(\.js$)/g,"") + '": "' + obj.path.replace(/^js\//,"") + '"';
                }
            }));
});

gulp.task("default", ["less", "copyimages", "buildhtml", "getStaticVersion"]);

/*
    Gulp build static files to dist folder
 */
gulp.task("lessBuild", function(){
    return gulp.src(["less/*.less"])
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest("dist/css/"));
});

//uglify compress
gulp.task('jsBuild', function(){
    gulp.src(['js/**/*.js'])
        .pipe(uglify({
            mangle:{
                except: ['require','module','exports','jQuery','Zepto']
            },
            preserveComments:'some'
        }))
        .pipe(gulp.dest('dist/js'));
});

gulp.task("imagesBuild", function(){
    return gulp.src(["less/img/**/*.*"], {base: "./less"})
            .pipe(gulp.dest("dist/css/"));
});

gulp.task('htmlBuild', function(){
    gulp.src('html/*.html')
        .pipe(includer())
        .pipe(gulp.dest('dist/'));
});

gulp.task("build", ["lessBuild", "jsBuild", "imagesBuild", "htmlBuild"]);