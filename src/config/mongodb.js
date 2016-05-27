// helpers/mongodb.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import mongoose from 'mongoose'

export default () => (req, res, next) => {
  if ( ! mongoose.connection.readyState) {
    mongoose.connect(process.env.MONGODB_URI)
  }
  
  return next()
}