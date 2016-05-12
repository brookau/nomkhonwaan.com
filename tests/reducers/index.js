// tests/reducers/index.js
// -----------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 10, 2016
//

import { expect } from 'chai'
import {
  NAV,
  POST
} from '../../src/actions'
import {
  initialState,
  myApp
} from '../../src/reducers'

describe('reducers/index.js', () => {
  it('should return an initialState', () => {
    expect(myApp(undefined, {})).to.equal(initialState)
  })
  
  it(`should handle ${NAV.ON_CLICK_MENU_BUTTON}`, () => {
    expect(myApp(undefined, {
      type: NAV.ON_CLICK_MENU_BUTTON, 
      isExpanded: true
    }))
    .to.deep.equal(Object.assign({}, initialState, {
      isExpanded: true
    }))
  })
  
  it(`should handle ${POST.GET_POSTS}`, () => {
    expect(myApp(undefined, {
      type: POST.GET_POSTS
    }))
    .to.deep.equal(Object.assign({}, initialState, {
      [POST.GET_POSTS]: {
        ...initialState[POST.GET_POSTS],
        isFetching: true
      }
    }))
  })
})