// actions/index.js
// ----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 4, 2016
//

export const NAV = {
  ON_CLICK_MENU_BUTTON: 'ON_CLICK_MENU_BUTTON'
}

export const POST = {
  GET_POSTS: 'GET_POSTS',
  GET_POSTS_RESPONSE: 'GET_POSTS_RESPONSE'
}

/**
 * Handle on click nav menu button
 * 
 * @param isExpanded  Boolean Nav menu status, default is false
 * @returns Object
 */
export function onClickMenuButton(isExpanded) {
  return {
    type: NAV.ON_CLICK_MENU_BUTTON,
    isExpanded: ! isExpanded
  }
}