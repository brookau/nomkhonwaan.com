// webpack.config.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

var fse = require('fs-extra')
var path = require('path')
var webpack = require('webpack')
// var CopyWebpackPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))

// Using fs-extra to copy stylesheets directory
// from src/ to dist/ before compiling Webpack modules
fse.copySync(
  path.resolve(__dirname, '..', 'src', 'stylesheets'), 
  path.resolve(__dirname, '..', 'dist', 'stylesheets')
)

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'client.js')
  ],
  output: {
    filename: '[hash].js',
    path: path.resolve(__dirname, '..', 'dist', 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: [ '', '.js', '.json', '.jsx' ],
    modulesDirectories: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    webpackIsomorphicToolsPlugin,
    new ExtractTextPlugin('[hash].css',{
      allChunks: true
    }),
    new webpack.DefinePlugin({ 
      'process.env': { 
        'NODE_ENV': JSON.stringify('production') 
      } 
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
    }, { 
      test: /\.scss$/, 
      loader: ExtractTextPlugin.extract('style', [
        'css?modules&importLoaders=2&sourceMap',
        'autoprefixer?browsers=last 2 version',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ].join('!'))
    }, { 
      test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, { 
      test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/octet-stream'
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file' 
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url?limit=10000&name=[hash].[ext]'
    }]
  }
}
