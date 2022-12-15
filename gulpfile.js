const gulp = require('gulp');
const path = require('path');
const through2 = require('through2');
const babel = require('gulp-babel');
const ts = require('gulp-typescript');
const del = require('del');
const merge2 = require('merge2');
const less = require('less');
const { readFileSync } = require('fs');
const postcss = require('postcss');
const autoprefixer = require('autoprefixer');
const NpmImportPlugin = require('less-plugin-npm-import');


const ROOT_PATH = __dirname;
const CJS_DIR_NAME = 'lib';
const ESM_DIR_NAME = 'es';

const libDir = path.join(process.cwd(), CJS_DIR_NAME);
const esDir = path.join(process.cwd(), ESM_DIR_NAME);

const tsConfigPath = path.resolve(process.cwd(), 'tsconfig.pro.json');

function transformLess(lessFile, config = {}) {
  const { cwd = process.cwd() } = config;
  const resolvedLessFile = path.resolve(cwd, lessFile);

  let data = readFileSync(resolvedLessFile, 'utf-8');
  data = data.replace(/^\uFEFF/, '');

  // Do less compile
  const lessOpts = {
    paths: [path.dirname(resolvedLessFile)],
    filename: resolvedLessFile,
    plugins: [new NpmImportPlugin({ prefix: '~' })],
    javascriptEnabled: true,
    modifyVars: {}
  };

  if (resolvedLessFile.includes('desktop-ui')) {
    lessOpts.modifyVars['@root-entry-name'] = 'default';
  }

  return less
    .render(data, lessOpts)
    .then((result) => postcss([autoprefixer]).process(result.css, { from: undefined }))
    .then((r) => r.css);
}

function compileLess(ismModules) {
  del.sync(ismModules !== false ? libDir : esDir);

  const lessS = gulp
    .src(['src/**/*.less'])
    .pipe(
      through2.obj(function (file, encoding, next) {
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
          transformLess(file.path)
            .then((css) => {
              file.contents = Buffer.from(css);
              file.path = file.path.replace(/\.less$/, '.css');
              this.push(file);
              next();
            })
            .catch((e) => {
              console.error(e);
            });
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(ismModules === false ? esDir : libDir));

  const assets = gulp
    .src(['src/**/*.@(png|svg)'])
    .pipe(gulp.dest(ismModules === false ? esDir : libDir));
  return merge2([lessS, assets]);
}

gulp.task('clean', async () => {
  await del('lib/**');
  await del('es/**');
  await del('dist/**');
});

gulp.task('compile:less', (done) => {
  compileLess(false).on('finish', done);
  compileLess(true).on('finish', done);
});

gulp.task('cjs', () => {
  const tsProject = ts.createProject(tsConfigPath, {
    module: 'CommonJS',
  });
  const babelConfigFilePath = path.resolve(ROOT_PATH, '.babelrc');

  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(babel({ configFile: babelConfigFilePath }))
    .pipe(gulp.dest(libDir));
});

gulp.task('es', () => {
  const tsProject = ts.createProject(tsConfigPath, {
    module: 'ESNext',
  });
  const babelConfigFilePath = path.resolve(ROOT_PATH, '.babelrc');

  return tsProject
    .src()
    .pipe(tsProject())
    .pipe(babel({ configFile: babelConfigFilePath }))
    .pipe(gulp.dest(esDir));
});

gulp.task('declaration', () => {
  const tsProject = ts.createProject(tsConfigPath, {
    declaration: true,
    emitDeclarationOnly: true,
  });
  return tsProject.src().pipe(tsProject()).pipe(gulp.dest(esDir)).pipe(gulp.dest(libDir));
});

exports.default = gulp.series('clean', gulp.parallel('compile:less', 'cjs', 'es', 'declaration'));
