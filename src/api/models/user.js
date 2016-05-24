// api/models/User.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import mongoose, { Schema } from 'mongoose'

export default (mongoose.models.User
  ? mongoose.model('User')
  : mongoose.model('User', new Schema({
    createdAt: { 
      type: Date, 
      default: Date.now 
    },
    updatedAt: Date,
    email: { 
      type: String, 
      unique: true, 
      required: true
    },
    displayName: {
      type: String,
      required: true
    }
  }, {
    collection: 'users'
  })
))