const path = require('path');
const webpack = require('webpack');

console.log(path.resolve(__dirname, 'client/public/js'));

module.exports = {
  mode: 'production',
  entry: __dirname + '/client/src/index.jsx',
  output: {
      path: path.resolve(__dirname, 'client/public/js'),
      filename: 'bundle.js'
  },
  module: {
      rules: [
        { test: /\.(js|jsx)?$/,
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
  devtool: 'source-map',
  resolve: {
      extensions: ['.js', '.jsx']
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env': {
           NODE_ENV: JSON.stringify('production')
         }
      })
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin()
  ]
};
