const path = require('path');
const merge = require('webpack-merge');
const os = require('os');
const webpackBaseConfig = require('./webpack.base.config.js');

const srcPath = path.resolve(__dirname, '../', 'src');
const distPath = path.resolve(__dirname, '../', 'dist');

const localIP = os.networkInterfaces().en0[1].address;
module.exports = merge(webpackBaseConfig, {
  target: 'web',
  entry: './index.js',
  output: {
    path: distPath,
    filename: 'client.[chunkhash].js',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    host: localIP,
    historyApiFallback: true, // BrowserRouter error
  },
});
