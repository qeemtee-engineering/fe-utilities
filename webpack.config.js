const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'web',
  entry: './src/index.js',
  mode: 'production',
  plugins: [new CaseSensitivePathsPlugin(), new CleanWebpackPlugin()],
  resolve: {
    extensions: ['.js', '.json', 'jsx']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '',
    filename: 'main.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    react: 'react',
    'react-dom': 'react-dom'
  }
};
