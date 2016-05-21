// index.js
// --------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 3, 2016
//

import path from 'path'
import dotenv from 'dotenv'
import Express from 'express'
import WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import webpackIsomorphicToolsConfiguration from './webpack-isomorphic-tools-configuration'

// Parse .env file
dotenv.config()

global.webpackIsomorphicTools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfiguration)
  .development(process.env.NODE_ENV === 'development')
  .server(path.resolve(__dirname, '..'), () => {
    const app = Express()
    
    // Callback Express.js server after 
    // webpack-isomorphic-tools generated assets file
    const server = require('./server').default(app)
      .listen(process.env.PORT || 8080, '0.0.0.0', (err) => {
        if (err) {
          console.log(err)
        } else {
          console.log('Server listening at http://%s:%s', 
            server.address().address, 
            server.address().port)
          console.log('Press Ctrl+C to quit.')
        }
      })
  })
