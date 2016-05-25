// helpers/logger.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

/**
 * Logger
 * 
 * Yep! it is a logger who logging everything.
 */
export default function() {
  return function Logger(req, res, next) {
    // Verify Redis session is working or not?
    if ( ! req.session) {
      console.log('%s [error] Redis session not working', new Date().toString());
    }
    
    // Log request URL
    console.log('%s [info] %s', 
      new Date().toString(), 
      req.originalUrl);
      
    return next()
  }
}