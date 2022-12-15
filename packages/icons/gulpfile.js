const gulp = require('gulp');
const { resolve } = require('path');
const flatten = require('gulp-flatten');
const del = require('del');
const commonConfig = require('../../gulpfile');

const tempDir = resolve(__dirname, 'temp')

gulp.task('copy', () => {
  return gulp.src(resolve(__dirname, 'svgs/**/*.svg'),)
    .pipe(flatten())
    .pipe(gulp.dest(tempDir));
})

gulp.task('clean', async () => {
  await del(tempDir);
  await del(resolve(__dirname, 'src/*'));
});

exports.default = commonConfig.default


