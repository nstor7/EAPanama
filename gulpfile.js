var gulp = require('gulp');
var rename = require('gulp-rename');
var babel = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify')

function compile(watch){
    var bundle = browserify('./src/index.js');

    if(watch){
        bundle = watchify(bundle);
        bundle.on('update', function(){
            console.log('---> bundling...');
            rebundle();
        })
    }
    function rebundle() {
    bundle
        .transform(babel, {presets: ['es2015']})
        .bundle()
        .on('error', function(err){ console.log(err);  this.emit('end')})
        .pipe(source('index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('public'));
}

    rebundle()
}

gulp.task('build', function(){
     return compile();
    });

gulp.task('watch', function(){
    return compile(true);
});

gulp.task('default', ['build'])
