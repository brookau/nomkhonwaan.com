// routes.js
// ---------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'
import { Route, IndexRoute } from 'react-router'
import {
  App,
  Page,
  Post, Posts,
  Tag, Tags
} from './components'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Posts} />
    <Route path="page/:page" component={Page} />
    <Route path="tags/:slug" component={Tag} />
    <Route path="tags" component={Tags} />
    <Route path=":year/:month/:date/:slug" component={Post} />
    <Route path=":year/:month/:date" component={Posts} />
    <Route path=":year/:month" component={Posts} />
    <Route path=":year" component={Posts} />
  </Route>
)
