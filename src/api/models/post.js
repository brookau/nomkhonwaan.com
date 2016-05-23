// api/models/Post.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import mongoose, { Schema } from 'mongoose'

/**
 * Post model
 * 
 * Store both post content both of markdown and HTML string. 
 * Special properties tags and users are de-normalized and follow MongoDB guide.
 */
export default mongoose.model(
  'Post', 
  new Schema({
    createdAt:   { 
      type: Date, 
      default: Date.now 
    },
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
)