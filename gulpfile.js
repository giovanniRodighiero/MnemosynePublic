var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
//var nodemon = require('gulp-nodemon');

function errorLog(error){
  console.error.bind(error);
  this.emit('end');
}


gulp.task('styles', function(){
  sass('./assets/styles/*.scss',{
   style:'compressed',
   loadPath:['node_modules/bootstrap-sass/assets/stylesheets']
 })
 .on('error', errorLog)
 .pipe(gulp.dest('public/stylesheets/'))
});

gulp.task('watch', function(){
  gulp.watch('./assets/styles/*.scss', ['styles']);
});

gulp.task('default', ['styles','watch']);
