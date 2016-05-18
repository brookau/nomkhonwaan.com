// api/models/Post.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 14, 2016
//

import { model, Schema } from 'mongoose'

const Post = model('Post', {
  createdAt:   { type: Date, default: Date.now },
  updatedAt:   Date,
  publishedAt: Date,
  tags:        [Schema.Types.Mixed],
  users:       [Schema.Types.Mixed],
  title:       String,
  slug:        String,
  markdown:    String,
  html:        String
})

export default Post