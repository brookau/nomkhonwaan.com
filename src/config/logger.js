// config/logger.js
// ----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

export default () => (req,res, next) => {
  // Verify Redis session is running?
  if ( ! req.session) {
    console.log('%s [error] Redis session not working',
      new Date().toString());
  }
  
  // Log all requests
  console.log('%s [info] %s',
    new Date().toString(),
    req.originalUrl);
  
  return next()
}