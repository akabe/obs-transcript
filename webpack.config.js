'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  // mode: 'production',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.min.js'
  },
  devtool: 'inline-source-map',
  // devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tag\.html$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: '@riotjs/webpack-loader',
            options: {
              hot: true
            }
          }
        ]
      },
      {
        test: /\.js|\.tag\.html$/,
        enforce: 'post',
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 51200,
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.tag.html']
  }
};
