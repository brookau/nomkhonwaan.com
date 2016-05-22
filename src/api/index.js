// api/routes.js
// -------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 12, 2016
//

import Express from 'express'
import {
  Posts,
  Tags,
  Users
} from './controllers'

const router = Express.Router()

// -- Before filters --

// Set up response type as a JSON string
router.use((req, res, next) => {
  res.set({
    'Content-Type': 'application/vnd.api+json'
  })
  
  return next()
})

// -- 

// Posts
router.get('/posts', Posts.getPosts)

// -- After filters --

// Errors handler
router.use((err, req, res, next) => {
  console.log('%s [error] %s', 
    new Date().toString(), 
    err);
  
  res
    .status(400)
    .json({
      errors: [{
        // TODO: Make dynamic error status
        status: 400,
        // TODO: Make dynamic error title
        title: "An error has occurred",
        detail: err.toString()
      }]
    })
})

// --

export default router