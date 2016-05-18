// webpack-isomorphic-tools-configuration.js
// -----------------------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 2, 2016
//

import path from 'path'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

export default {
  webpack_assets_file_path: 'webpack-assets.json',
  webpack_stats_file_path: 'webpack-stats.json',
  assets: {
    fonts: {
      extensions: [ 'woff', 'woff2', 'ttf', 'eot' ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    images: {
      extensions: [ 'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg' ],
      parser: WebpackIsomorphicToolsPlugin.url_loader_parser
    },
    style_modules: {
      extensions: [ 'scss' ]
    }
  }
}
