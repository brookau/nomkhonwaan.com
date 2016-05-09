// index.js
// --------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 3, 2016
//

import path from 'path'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import webpackIsomorphicToolsConfiguration from './webpack-isomorphic-tools-configuration'

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfiguration)
  .development(process.env.NODE_ENV === 'development')
  .server(path.resolve(__dirname, '..'), () => {
    // Callback Express.js server after webpack-isomorphic-tools generated assets file
    require('./server')
  })
