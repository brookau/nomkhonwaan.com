// api/models/User.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import { model, Schema } from 'mongoose'

const User = model('User', {
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
  email: String,
  displayName: String
})

export default User