// api/routes.js
// -------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 12, 2016
//

import Express from 'express'
import {
  Posts,
  Tags
} from './controllers'

const router = Express.Router()

// Posts routes
router.use('/posts', Posts.getPosts)
router.use('/posts/:slug', Posts.getPost)

// Tags routes
router.use('/tags', Tags.getTags)
router.use('/tags/:slug', Tags.getTag)

export default router