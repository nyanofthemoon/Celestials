const path = require('path');
const webpack = require('webpack');
//const autoprefixer = require('autoprefixer');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'client/src/index.jsx'),
  output: {
      path: path.resolve(__dirname, 'client/public/assets/js'),
      filename: 'bundle.js'
  },
  module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss?$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
  },
  resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
          joi: 'joi-browser'
      }
  },
  plugins: []
};
