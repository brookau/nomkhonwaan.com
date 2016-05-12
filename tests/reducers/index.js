// tests/reducers/index.js
// -----------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 10, 2016
//

import expect from 'expect'
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
    expect(myApp(undefined, {})).toEqual(initialState)
  })
  
  it(`should handle ${NAV.ON_CLICK_MENU_BUTTON}`, () => {
    expect(myApp(undefined, {
      type: NAV.ON_CLICK_MENU_BUTTON, 
      isExpanded: true
    }))
    .toEqual(Object.assign({}, initialState, {
      isExpanded: true
    }))
  })
})