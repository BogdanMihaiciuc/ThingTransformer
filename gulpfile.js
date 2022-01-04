// @ts-check

const { series, dest } = require('gulp');
const del = require('del');

const ts = require('gulp-typescript');

const project = ts.createProject('./tsconfig.json');

async function clean() {
    await del('dist');
}

async function build(cb) {
    return project.src().pipe(project()).js.pipe(dest('dist'));
}

exports.default = series(clean, build);
