const path = require('path');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const pkg = require('./package.json');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  mode: 'production',
  entry: {
    main: './src/index.js',
    services: './src/services',
    constants: './src/constants',
    helpers: './src/helpers'
  },
  plugins: [new CaseSensitivePathsPlugin(), new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'src')]
  },
  externals: [...Object.keys(pkg.dependencies || {}), nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: '[name].js',
    library: 'fe-utilities',
    libraryTarget: 'umd'
  }
};
