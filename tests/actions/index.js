// tests/actions/index.js
// ----------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 10, 2016
//

import { expect } from 'chai'
import {
  NAV,
  onClickMenuButton
} from '../../src/actions'

describe('actions/index.js', () => {
  it('should toggle isExpanded variable', () => {
    const isExpanded = false
    
    expect(onClickMenuButton(isExpanded)).to.deep.equal({
      type: NAV.ON_CLICK_MENU_BUTTON,
      isExpanded: ! isExpanded
    })  
  })
})