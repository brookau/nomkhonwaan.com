// api/helpers/pagination.js
// -------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 27, 2016
//

import { format, parse } from 'url'

/**
 * @param page  Integer Current page number
 * @param itemsPerPage Integer Limit items per page
 * @param totalItems Integer Total items 
 * @param url string  Base URL to generate pagination URL
 * @returns Object
 */
export default (page, itemsPerPage, totalItems, url = '/') => {
  let links = {}
  let urlObj = parse(url, true)
  
  if ( ! urlObj.query['page[number]']) {
    urlObj.query['page[number]'] = page
  }
  
  if ( ! urlObj.query['page[size]']) {
    urlObj.query['page[size]'] = itemsPerPage  
  }
  
  if (totalItems > itemsPerPage) {
    if (page > 1) {
      links.previous = decodeURI(
        format(Object.assign(urlObj, {
          search: null,
          query: {
            ...urlObj.query,
            ['page[number]']: page - 1
          }
        }))
      )
    }
    
    if (page < Math.ceil(totalItems / itemsPerPage)) {
      links.next = decodeURI(
        format(Object.assign(urlObj, {
          search: null,
          query: {
            ...urlObj.query,
            ['page[number]']: page + 1
          }
        }))
      )
    }
  }
  
  return Object.assign(links, {
    self: format(url)
  })
}