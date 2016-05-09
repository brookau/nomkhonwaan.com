// client.js
// ---------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
// import { ReduxAsyncConnect } from 'redux-async-connect'
import { ReduxAsyncConnect } from 'redux-connect'

import { browserHistory, Router } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { createDevTools, persistState } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import reducers from './reducers'
import routes from './routes'

// Grab the state from a global injected into server-generated HTML
const initialState = window.__INITIAL_STATE__

// Get running Node.js environment
const env = window.__NODE_ENV__

// Create new Redux DevTools instance
const DevTools = createDevTools(
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
    <LogMonitor theme="tomorrow" preserveScrollTop={false} />
  </DockMonitor>
)

// Create Redux store with initial state
const store = createStore(
  reducers,
  initialState,
  compose(
    DevTools.instrument(),
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
  )
)

// Using browserHistory for removing hash (#) sign from URL
const history = syncHistoryWithStore(browserHistory, store)

render(
  <Provider store={store} key="provider">
    <div>
      <Router render={(renderProps) =>
        <ReduxAsyncConnect {...renderProps} />
      } history={history}>
        {routes}
      </Router>
      {(env === 'development'
        ? <DevTools />
        : null)}
    </div>
  </Provider>,
  document.getElementById('root')
)
