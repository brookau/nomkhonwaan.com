// api/models/Post.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import mongoose, { Schema } from 'mongoose'

let postSchema = new Schema({
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   Date,
  publishedAt: Date,
  tags:        [Schema.Types.Mixed],
  users:       [Schema.Types.Mixed],
  title:       String,
  slug:        String,
  markdown:    String,
  html:        String
}, { 
  collection: 'posts' 
})

export default mongoose.model('Post', postSchema)