// server.js
// ---------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import _ from 'lodash'
import path from 'path'
import helmet from 'helmet'
// import enforce from 'express-sslify'
import Express from 'express'
import session from 'express-session'
import RedisStore from 'connect-redis'
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

import api from './api'

const app = Express()

// All of API endpoint will started with the API base URL
const apiBaseUrl = '/api'

// Current API version
const apiVersion = 'v1'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfiguration)
let webpackConfig = require('./webpack.config')

// Setup Redis session
app.use(session({
  store: new (RedisStore(session))({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379'
  }),
  secret: '^z!CG%7WsdPq',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true
  }
}))

// Compress all output
app.use(compression())

// Secure Express website with Helmet
app.use(helmet())

// Log all request URL
app.use((req, res, next) => {
  // Verify Redis session is working or not?
  if ( ! req.session) {
    console.log('%s [error] Redis session not working', new Date().toString());
  }
  
  console.log('%s [info] %s', new Date().toString(), req.originalUrl)
  return next()
})

// Setup API routes
app.use(`${apiBaseUrl}/${apiVersion}`, api)

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
      ...webpackConfig.output,
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
  
  // Remove require() cache
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
    } else {
      return res.status(404).send('Page not found')
    }
  })
})

const server = app.listen(process.env.PORT || 8080, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server listening at http://%s:%s', server.address().address,
      server.address().port)
    console.log('Press Ctrl+C to quit.')
  }
})
