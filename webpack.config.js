const path = require('path');
const AutoapiWebpackPlugin = require('./lib/autoapi-webpack-plugin');

const resolvePath = (_path) => path.resolve(__dirname, _path);

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: resolvePath('./dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new AutoapiWebpackPlugin({
      targets: ["./src/*.js"],
      merge: false,
      outDirname: "apis",
    }),
  ],
}
