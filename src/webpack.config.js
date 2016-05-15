// webpack.config.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

var _ = require('lodash')
var fse = require('fs-extra')
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))

// Using fs-extra to copy static files from src/ to dist/
_.each(
  ['fonts', 'images', 'stylesheets'],
  (dirname) => {
    fse.copySync(
      path.resolve(__dirname, '..', 'src', dirname),
      path.resolve(__dirname, '..', 'dist', dirname)
    )  
  }
)

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(__dirname, 'client.js')
  ],
  output: {
    filename: '[hash].js',
    path: path.join(__dirname, '..', 'public'),
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
      include: __dirname
    }, {
      test: /\.s?css$/,
       loader: ExtractTextPlugin.extract('style', [
        'css?modules&importLoaders=2&sourceMap',
        'autoprefixer?browsers=last 2 version&browsers=safari 5&browsers=ie 9',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ].join('!'))
    }, { 
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file?limit=10000&mimetype=application/octet-stream'
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file'
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=image/svg+xml'
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url?limit=10000&name=[hash].[ext]'
    }]
  }
}