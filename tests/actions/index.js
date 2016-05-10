// tests/actions/index.js
// ----------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 10, 2016
//

import expect from 'expect'
import {
  NAV,
  onClickMenuButton
} from '../../src/actions'

describe('actions/index.js', () => {
  it('should toggle isExpanded variable', () => {
    const isExpanded = false
    const expectedAction = {
      type: NAV.ON_CLICK_MENU_BUTTON,
      isExpanded: true
    }
    expect(onClickMenuButton(isExpanded)).toEqual(expectedAction)  
  })
})