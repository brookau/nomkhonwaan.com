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

// Static files path
var staticPath = path.resolve(__dirname, '..', 'static')
var staticFontsPath = path.join(staticPath, 'fonts')

// node_modules directory
var nodeModulesPath = path.resolve(__dirname, '..', 'node_modules')

// FontAwesome files path
var fontAwesomePath  = path.join(nodeModulesPath, 'font-awesome')
var fontAwesomeCssPath  = path.join(fontAwesomePath , 'css')
var fontAwesomeFontsPath  = path.join(fontAwesomePath , 'fonts')

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
    alias: {
      'NotoSans-Regular.ttf': path.join(staticFontsPath, 'NotoSans-Regular.ttf'),
      'NotoSans-Bold.ttf': path.join(staticFontsPath, 'NotoSans-Bold.ttf'),
      'NotoSans-Italic.ttf': path.join(staticFontsPath, 'NotoSans-Italic.ttf'),
      'NotoSans-BoldItalic.ttf': path.join(staticFontsPath, 'NotoSans-BoldItalic.ttf'),
      'NotoSansThai-Regular.ttf': path.join(staticFontsPath, 'NotoSansThai-Regular.ttf'),
      'NotoSansThai-Bold.ttf': path.join(staticFontsPath, 'NotoSansThai-Bold.ttf'),
      'font-awesome.css': path.join(fontAwesomeCssPath , 'font-awesome.css')
    },
    extensions: [ '', '.js', '.json', '.jsx' ],
    modules: [
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
        'autoprefixer?browsers=last 2 version&browsers=safari 5&browsers=ie 9',
        'sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true'
      ].join('!'))
    }, { 
      test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=application/font-woff',
      include: [
        fontAwesomeFontsPath
      ]
    }, { 
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file?limit=10000&mimetype=application/octet-stream',
      include: [
        fontAwesomeFontsPath,
        staticFontsPath
      ]
    }, { 
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'file',
      include: [
        fontAwesomeFontsPath
      ]
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
      loader: 'url?limit=10000&mimetype=image/svg+xml',
      include: [
        fontAwesomeFontsPath
      ]
    }, {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url?limit=10000&name=[hash].[ext]'
    }]
  }
}
