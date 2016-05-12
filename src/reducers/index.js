// redurecers/index.js
// -------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
// import { reducer as reduxAsyncConnect } from 'redux-async-connect'
import { reducer as reduxAsyncConnect } from 'redux-connect'
import { 
  NAV,
  POST 
} from '../actions'

export const initialState = {
  isExpanded: false,
  entities: {
    posts: {}
  },
  [POST.GET_POSTS]: {
    isFetching: false,
    lastUpdated: NaN,
    items: []
  }
}

export const myApp = (state = initialState, action) => {
  switch (action.type) {
    case NAV.ON_CLICK_MENU_BUTTON: 
      return Object.assign({}, state, {
        isExpanded: action.isExpanded
      })
    case POST.GET_POSTS:
    case POST.GET_POSTS_RESPONSE: 
      return Object.assign({}, state, {
        [POST.GET_POSTS]: getPostsAPI(state[POST.GET_POSTS], action)
      })
    default:
      return state
  }
}

export const getPostsAPI = (state, action) => {
  switch (action.type) {
    case POST.GET_POSTS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case POST.GET_POSTS_RESPONSE: 
      return Object.assign({}, state, {
        isFetching: false,
        lastUpdated: action.receivedAt,
        items: action.posts
      })
    default:
      return state
  }
}

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  myApp
})
