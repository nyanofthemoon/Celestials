const path = require('path');
const webpack = require('webpack');

console.log(path.resolve(__dirname, 'client/public/js'));

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    __dirname + '/client/src/index.jsx'
  ],
  output: {
      path: path.resolve(__dirname, 'client/public/js'),
      publicPath: '/js/',
      filename: 'bundle.js'
  },
  module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|jsx)?$/,
          exclude: /node_modules/,
          use: ['eslint-loader']
        },
        { test: /\.(js|jsx)?$/,
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
  devtool: 'cheap-eval-sourcemaps',
  devServer: {
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
  resolve: {
      extensions: ['.js', '.jsx']
  },
  plugins: [
      new webpack.DefinePlugin({
        'process.env': {
           NODE_ENV: JSON.stringify('development')
         }
      })
  ]
};
