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

const publicFields = [
  'title',
  'slug',
  'publishedAt',
  'html',
  'tags',
  'users'
]

/**
 * Format post's author data
 * 
 * @param id          String  Author ID 
 * @param displayName String  Author display name
 * @param email       String  Author email
 * @returns Object
 */
function formatAuthor({id, displayName, email }) {
  return {
    type: 'users',
    id,
    attributes: {
      displayName,
      email
    }
  }
}

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
function formatPost({ _id, title, slug, publishedAt, html, tags, users }) {
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
        data: _.reduce(users, (result, value) => {
          const {
            id, 
            type
          } = formatAuthor(value)
          
          result.push({ id, type })
          return result
        }, [])
      }
    }
  }
}

export const getPosts = (req, res, next) => {
  try {
    // Pagination
    let page = req.query.page || {}
    
    // Default posts per page is 5
    page.size = parseInt(page.size) || 5
    page.number = parseInt(page.number) || 1
    
    Post
      // TODO: Allow query on draft too
      .find({
        publishedAt: {
          '$exists': true
        }
      })
      // TODO: Allow query on private fields
      .select(publicFields.join(' '))
      .limit(page.size)
      .skip((page.number - 1) * page.size)
      // TODO: Allow order by other fields
      .sort({
        publishedAt: 'desc'
      })
      .exec((err, items) => {
        if (err) {
          return next(err)
        }
        
        res.json({
          data: _.reduce(items, (result, value) => {
            result.push(formatPost(value))
            return result
          }, []),
          // TODO: Check included params
          included: []
        })
      })
  } catch (err) {
    return next(err)
  }
}
