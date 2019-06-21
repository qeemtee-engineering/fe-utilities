const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  devtool: 'source-map',
  mode: 'development',
  plugins: [
    new CaseSensitivePathsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: './index.html'
    })
  ],
  module: {
    rules: [{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }]
  },
  resolve: {
    extensions: ['.js', '.json', 'jsx']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    progress: true,
    publicPath: '/',
    historyApiFallback: true
  }
};
