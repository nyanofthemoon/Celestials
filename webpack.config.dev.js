const path = require('path');
const webpack = require('webpack');

console.log(path.resolve(__dirname, 'client/public/js'));

module.exports = {
  mode: 'development',
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
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
        { test: /\.jsx?$/,
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


/*
module.exports = {
    entry: __dirname + '/client/src/index.jsx',
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        },{
            test: /\.scss?$/,
            exclude: /node_modules/,
            loader: 'style!css!postcss!sass'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: 'client/public/js',
        filename: 'app-bundle.js'
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        })
    ]
};
*/