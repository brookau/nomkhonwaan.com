// server.js
// ---------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import _ from 'lodash'
import path from 'path'
import helmet from 'helmet'
import Express from 'express'
import mongoose from 'mongoose'
import compression from 'compression'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { createMemoryHistory, match } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import webpackIsomorphicToolsConfiguration from './webpack-isomorphic-tools-configuration'

import reducers from './reducers'
import routes from './routes'
import { Html } from './components'

import { url, logger, mongodb, session } from './helpers'

import apiRoutes from './api'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfiguration)
let webpackConfig = require('./webpack.config').default

export default (app) => {
  // Hide X-Powered-By header
  app.disable('x-powered-by')

  // Compress all output
  app.use(compression({
    // Levels are specified in a range of 0 to 9, where-as 0 is
    // no compression and 9 is best compression, but slowest
    level: 9
  }))

  // Secure Express website with Helmet
  app.use(helmet())
  
  // Setup session 
  app.use(session())
  
  // SetupMongoDB connection
  app.use(mongodb())
  
  // Setup URL
  app.use(url())

  // Using Logger for logging!
  app.use(logger())

  // Setup API routes prefix
  app.use(`/api/v1`, apiRoutes)
  
  // Setup JSON response format
  // TODO: Allow disable pretty JSON response
  app.set('json spaces', 4)
  app.set('json replacer', null)
  
  // Serve static directory
  app.use('/static', Express.static(webpackConfig.output.path))

  // Setup extra parameters for production environment
  if (process.env.NODE_ENV === 'production') {
    // app.use(enforce.HTTPS({
    //   trustProtoHeader: true
    // }))  
  } 

  // Setup extra parameters for development environment
  else if (process.env.NODE_ENV === 'development') {
    webpackConfig = Object.assign({}, webpackConfig, {
      entry: [
        ...webpackConfig.entry,
        'webpack-hot-middleware/client?path=/__webpack_hmr'
      ],
      output: {
        ...
        _.reduce(webpackConfig.output, (result, value, key) => {
          if (key !== 'filename') {
            result[key] = value
          }
          return result
        }, {}),
        filename: 'bundle.js'
      },
      plugins: [
        ...
        _.reduce(webpackConfig.plugins, (result, value) => {
          if (value.constructor.name !== 'Webpack_isomorphic_tools_plugin' && 
              value.constructor.name !== 'DefinePlugin' && 
              value.constructor.name !== 'UglifyJsPlugin') {
            result.push(value)
          }
          return result
        }, []),
        webpackIsomorphicToolsPlugin.development(),
        new webpack.DefinePlugin({ 
          'process.env': { 
            'NODE_ENV': JSON.stringify('development') 
          } 
        }),
        new webpack.HotModuleReplacementPlugin()
      ]
    })
    
    // Disable require() cache
    global.webpackIsomorphicTools.refresh()
    
    // Webpack 
    const compiler = webpack(webpackConfig)
    
    app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      stats: {
        colors: true
      }
    }))

    app.use(webpackHotMiddleware(compiler, {
      log: console.log
    }))
  }

  app.use((req, res, next) => {
    // Create a Redux store instance
    const store = createStore(reducers)

    // Grab the initial state from our Redux store
    const initialState = store.getState()

    // Integrate with react-router-redux
    const history = syncHistoryWithStore(createMemoryHistory(req.originalUrl), store)

    match({
      routes,
      location: req.originalUrl,
      history
    }, (err, redirect, renderProps) => {
      if (err) {
        return next(err)
      } else if (redirect) {
        return res.redirect(redirect)
      } else if (renderProps) {
        const components = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        )
        
        loadOnServer({ ...renderProps, store })
          .then(
            () => 
              res
                .status(200)
                .send('<!DOCTYPE html>' + renderToString(
                  <Html assets={webpackIsomorphicTools.assets()}
                    initialState={initialState} 
                    components={(process.env.NODE_ENV === 'development'
                      ? null
                      : components)} />
                )), 
            (err) => 
              next(err)
          )
      }
    })
  })
  
  return app
}