// api/models/User.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import mongoose, { Schema } from 'mongoose'

let userSchema = new Schema({
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  email: String,
  displayName: String
}, {
  collection: 'users'
})

export default mongoose.model('User', userSchema)