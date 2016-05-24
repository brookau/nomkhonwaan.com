// api/models/Post.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import mongoose, { Schema } from 'mongoose'

export default (mongoose.models.Post
  ? mongoose.model('Post')
  : mongoose.model('Post', new Schema({
    createdAt:   { 
      type: Date, 
      default: Date.now 
    },
    updatedAt:   Date,
    publishedAt: Date,
    tags:        [Schema.Types.Mixed],
    users:       [Schema.Types.Mixed],
    title:       {
      type: String,
      required: true
    },
    slug:        {
      type: String,
      unique: true,
      required: true
    },
    markdown:    String,
    html:        String
  }, { 
    collection: 'posts' 
  })
))
