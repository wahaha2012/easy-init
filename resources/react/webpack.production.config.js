var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: path.resolve(__dirname, 'app/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [
            'es2015',
            'react'
          ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      }, 
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.png|\.jpg$/,
        loader: 'url-loader?limit=8192'
      },
    ]
  },

  // devtool: 'cheap-source-map',

  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack'
    })
  ]
};

module.exports = config;