const path = require('path');
const webpack = require('webpack');
//const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
     path.resolve(__dirname + '/client/src/index.jsx')
  ],
  output: {
      path: path.resolve(__dirname, 'client/public/js'),
      publicPath: '/js/',
      filename: 'bundle.js'
  },
  module: {
      rules: [
        /*
        {
          enforce: 'pre',
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: ['eslint-loader']
        },*/
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.scss?$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
  },
  devServer: {
        port: 9000,
        contentBase: 'client/public',
        watchContentBase: true,
        progress: true,
        hot: true,
        inline: true,
        hotOnly: true,
        overlay: {
          warnings: true,
          errors: true
        },
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': '*'
        }
  },
  //postcss: () => {
  //  return [ autoprefixer({ browsers: ['last 3 versions'] }) ]
  //},
  devtool: 'inline-source-map',
  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
          joi: 'joi-browser'
      }
  },
  plugins: []
};
