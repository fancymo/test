const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.resolve(__dirname, '../', 'src');
const distPath = path.resolve(__dirname, '../', 'dist');

module.exports = {
  context: srcPath,
  resolve: {
    // 配置模块库所在的位置，如 node_modules，缩小文件搜索范围
    modules: ['node_modules', 'src'],
    extensions: ['*', '.js', '.json'],
    // 先使用jsnext:main字段，在没有时使用main字段。这样就可以优化支持tree-shaking的库
    // mainFields: ['jsnext:main', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // 开启 babel-loader 缓存
        loader: 'babel-loader?cacheDirectory',
        // include: srcPath
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // 开启 css 压缩
          use: ['css-loader?minimize', 'less-loader']
        }),
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
      }, {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'file-loader',
      }, {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: `${srcPath}/index.html`,
    }),
    new ExtractTextPlugin('main.[chunkhash].css'),
  ],
};
