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
 * Set base URL to Express request object
 */
export default function() {
  return function URL(req, res, next) {
    req.baseURL = format({
      protocol: req.protocol,
      host: req.get('host'),
      pathname: req.originalUrl
    })
    
    return next()
  }
}