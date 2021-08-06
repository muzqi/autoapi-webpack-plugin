const fs = require('fs');
const path = require('path');
const util = require('util');
const { babelTraverse, mdTransform } = require('babel-autoapi');
const glob = require('glob');

const defaultOptions = {
  merge: true,
  toc: true,
  outFilename: 'README',
}

class AutoapiWebpackPlugin {
  constructor(options) {
    this.options = Object.assign(defaultOptions, options);

    if (!this.options.merge) {
      if (!this.options.outDirname) throw new Error('Error: out-dirname is undefined!');
    }
    if (Object.prototype.toString.call(this.options.targets) !== '[object Array]') {
      throw new Error('TypeError: options.targets must be a Array!');
    }
    if (!this.options.targets || !this.options.targets.length) {
      throw new Error('Error: no entry file is specified!');
    }
  }

  apply(compiler) {
    compiler.hooks.done.tap(
      'AutoapiWebpackPlugin',
      () => {
        const { targets, merge, toc, outFilename, outDirname } = this.options;

        const docs = [];

        // 读取文件，生成 docs json
        targets.map(dir => {
          const files = glob.sync(`${process.cwd()}/${dir}`);

          files.map(file => {
            const sourceCode = fs.readFileSync(file, { encoding: 'utf-8' });
            const doc = babelTraverse(sourceCode);

            docs.push({
              filename: path.basename(file),
              dataSource: doc,
            });
          });
        });

        const EXTNAME = 'md';

        if (merge) {
          const _outFilename = `${process.cwd()}/${outFilename}.${EXTNAME}`;
          fs.writeFileSync(_outFilename, mdTransform(docs, toc));
        } else {
          const _outDirname = `${process.cwd()}/${outDirname}`;
          const resolveFilename = (filename) => `${_outDirname}/${filename.replace(path.extname(filename), '')}.${EXTNAME}`

          util.promisify(fs.stat)(_outDirname)
            .then(() => {
              docs.map(d => {
                fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, toc));
              });
            })
            .catch(() => {
              fs.mkdirSync(_outDirname); // 创建文件夹
              docs.map(d => {
                fs.writeFileSync(resolveFilename(d.filename), mdTransform(d, toc));
              });
            });
        }
      },
    );
  }
}

module.exports = AutoapiWebpackPlugin;
