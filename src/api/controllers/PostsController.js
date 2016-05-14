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

// Get list of posts
export const getPosts = (req, res) => {
}