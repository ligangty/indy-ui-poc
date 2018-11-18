const path = require('path');
// const webpack = require('webpack');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'build';

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.resolve(__dirname, outputDirectory),
    filename: 'index_bundle.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  // devServer: {
  //   port: 3000,
  //   contentBase: './build',
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /\/browse\/.*/, to: '/' },
  //     ]
  //   },
  //   proxy: {
  //     '/api': 'http://localhost:8080'
  //   }
  // },
  module: {
    rules: [
      {test: /\.js$/u, use: 'babel-loader', exclude: /node_modules/u},
      {test: /\.jsx?$/u, use: 'babel-loader', exclude: /node_modules/u},
      {test: /\.css$/u, use: ['style-loader', 'css-loader']},
      {
        test: /\.less$/u,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: "[local]___[hash:base64:5]"
            }
          },
          {
            loader: "less-loader"
          }
        ]
      },
      {
        test: /\.(pdf|jpg|png|gif|svg|ico)$/u,
        use: [
          {
            loader: 'url-loader'
          },
        ]
      },
      {test: /\.eot(\?[0-9a-z\-=]+)?$/u, loader: 'file-loader'},
      {test: /\.woff2*(\?[0-9a-z\-=]+)?$/u,loader: "url-loader"},
      {test: /\.ttf(\?[0-9a-z\-=]+)?$/u,loader: 'file-loader'}
    ]
  }
};
