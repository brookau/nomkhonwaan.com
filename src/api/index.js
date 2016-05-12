// api/routes.js
// -------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 12, 2016
//

import Express from 'express'
import {
  Posts
} from './controllers'

const router = Express.Router()

router.use('/posts', Posts.getPosts)

export default router