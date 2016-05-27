// middleware/api.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 26, 2016
//

const api = store => next => action => {
  return next(action)
}
