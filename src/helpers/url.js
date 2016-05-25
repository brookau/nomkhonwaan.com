// helpers/url.js
// --------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import { format } from 'url'

/**
 * URL
 * 
 * Set full URL (without query parameters) to Express request object
 */
export default function() {
  return function URL(req, res, next) {
    req.fullURL = format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.baseUrl
    })
    
    return next()
  }
}