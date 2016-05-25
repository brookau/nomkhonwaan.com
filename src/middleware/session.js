// middleware/session.js
// ---------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import session from 'express-session'
import RedisStore from 'connect-redis'

/**
 * Session
 * 
 * To handle Express session, using Redis database to store all session data. 
 * You can setup Redis connection and Redis secret key on .env file at the root
 * project directory.
 */
export default function(req, res, next) {
  return session({
    store: new (RedisStore(session))({
      url: process.env.REDIS_URL
    }),
    secret: process.env.REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true
    }
  })
}