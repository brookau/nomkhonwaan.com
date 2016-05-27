// helpers/session.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import session from 'express-session'
import RedisStore from 'connect-redis'

export default () => session({
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