// helpers/mongodb.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import mongoose from 'mongoose'

/**
 * MongoDB 
 * 
 * Using Mongoose ODM for doing on MongoDB, like Redis you can edit/setup
 * the connection URI on .env file at the root of this project directory
 */
export default function() {
  return function MongoDB(req, res, next) {
    mongoose.connect(process.env.MONGODB_URI)
    
    return next()
  }
}