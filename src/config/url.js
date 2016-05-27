// helpers/url.js
// --------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 25, 2016
//

import { format } from 'url'

export default url => (req, res, next) => {
  req.fullURL = (url
    ? url
    : format({
        host: req.get('host'),
        pathname: req.baseUrl,
        protocol: req.protocol
      }))
      
  return next()
}