// client.js
// ---------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { ReduxAsyncConnect } from 'redux-connect'

import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { persistState } from 'redux-devtools'

import reducers from './reducers'
import routes from './routes'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

// Create Redux store with initial state
const store = createStore(
  reducers,
  initialState,
  compose(
    window.devToolsExtension && window.devToolsExtension(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )
)

// Using browserHistory for removing hash (#) sign from URL
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store} key="provider">
    <Router render={(renderProps) =>
      <ReduxAsyncConnect {...renderProps} />
    } history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
)
