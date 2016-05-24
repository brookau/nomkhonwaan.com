// api/controllers/PostsController
// -------------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 12, 2016
//
// =============================================================================
//
// Exmaple model
// -------------
//
// /api/v1/posts?include=author&page[number]=1&page[size]=5
//
// {
//   "data": [{
//     "type": "posts",
//     "id": "573681841319dce22ea6f523",
//     "attributes": {
//       "title": "[AngularJS] อ้าวส่ง AJAX ผ่าน $http ดันเป็นค่าว่างซะงั้น?",
//       "slug": "angularjs-post-does-not-send-dat",
//       "markdown": "...",
//       "html": "...",
//       "tags": [{
//         "name": "AngularJS",
//         "slug": "angularjs"
//       }, {
//         "name": "JSON",
//         "slug": "json"
//       }],
//       "publishedAt": "2015-08-17T03:03:28Z",
//       "createdAt": "2016-05-14T01:38:12.697Z",
//       "updatedAt": "2016-05-14T01:38:12.697Z"
//     },
//     "relationships": {
//       "author": {
//         "data": {
//           "id": "573681841319dce22ea6f522",
//           "type": "users"
//         }
//       }
//     }
//   }, {
//     ...
//   }],
//   "included": [{
//     "type": "users",
//     "id": "573681841319dce22ea6f522",
//     "attributes": {
//       "displayName": "Natcha Luang - Aroonchai",
//       "email": "me@nomkhonwaan.com"
//     }
//   }]
// }

import _ from 'lodash'
import Q from 'q'
import { Post } from '../models'

export const publicFields = [
  'title',
  'slug',
  'publishedAt',
  'html',
  'tags',
  'users'
]

/**
 * Format post object
 * 
 * @param _id         String  Post ID
 * @param title       String  Post title 
 * @param slug        String  Post slug, **uniqued**
 * @param publishedAt Date    Post published date - time 
 * @param html        String  Post content as a HTML format
 * @param tags        Array   Post's tags
 * @param users       Array   Post's authors
 * @returns Object
 */
function format({ _id, title, slug, publishedAt, html, tags, users }) {
  return {
    type: 'posts',
    id: _id,
    attributes: {
      title,
      slug,
      // TODO: Include markdown field
      // markdown,
      html,
      tags,
      publishedAt,
      // TODO: Include createdAt, updatedAt fields
      // createdAt,
      // updatedAt
    },
    relationships: {
      // TODO: Check include author param
      author: {
        data: users.reduce((result, { id }) => {
          result.push({
            type: 'users',
            id
          })
          
          return result
        }, [])
      }
    }
  }
}

/**
 * [GET] /api/posts
 * 
 * Get list of post, default return 5 latest published posts.
 * 
 * @param page.size   Integer  Item per page
 * @param page.number Integer  Current page number
 */
export function getPosts(req, res, next) {
  try {
    // Pagination
    let page = req.query.page || {}
    
    // Default posts per page is 5
    page.size = parseInt(page.size) || 5
    page.number = parseInt(page.number) || 1
    
    Post
      // TODO: make dynamic find condition
      .find({
        publishedAt: {
          '$exists': true
        }
      })
      // TODO: make dynamic select fields
      .select(publicFields.join(' '))
      .limit(page.size)
      .skip((page.number - 1) * page.size)
      // TODO: make dynamic order
      .sort({
        publishedAt: 'desc'
      })
      .exec((err, items) => {
        if (err) {
          return next(err)
        }
        
        res.json({
          data: items.reduce((result, item) => {
            result.push(format(item))
            
            return result
          }, []),
          // TODO: make dynamic included fields
          // TODO: allow included related posts
          included: items
            .map((item) => {
              return item.users
            })
            .reduce((result, users) => {
              users.forEach(({ id, displayName, email }) => {
                if ( ! _.includes(
                  result.map((user) => {
                    return user.id
                  }),
                  id
                )) {
                  result.push({
                    type: 'users',
                    id,
                    attributes: {
                      displayName,
                      email
                    }
                  })
                }
              })
              
              return result
            }, [])
        })
      })
  } catch (err) {
    return next(err)
  }
}
