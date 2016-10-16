var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: [
    './app/main.js',
  ],
  output: {
    path: './build',
    // publicPath: '/assets/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: "source-map-loader"
    //   }
    // ],

    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          // plugins: ['transform-runtime'], 
          cacheDirectory: true,
          presets: [
            'es2015',
            'react'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }, {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.png|\.jpg$/,
        loader: 'url-loader?limit=8192'
      },
    ],
  },

  devtool: 'cheap-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack'
    }),
    new OpenBrowserPlugin({
      url: 'http://127.0.0.1:8001'
    })
  ]
};