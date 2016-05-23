// test/api/controllers/posts.js
// -----------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 22, 2016
//

import Express from 'express'
import request from 'supertest'
import { Types } from 'mongoose'

import { mock, stub } from 'sinon'
import { expect } from 'chai'
import 'sinon-mongoose'

import apiRoutes from '../../../src/api'
import { publicFields } from '../../../src/api/controllers/posts'
import { Post } from '../../../src/api/models'


describe('api/controllers/posts.js', () => {
  let agent
  let PostMock
  
  before(() => {
    const app = Express()
    app.use('/api/v1', apiRoutes)
    
    agent = request.agent(app)
  })
  
  beforeEach(() => {
    PostMock = mock(Post)
  })

  afterEach(() => {
    PostMock.restore()
  })
  
  describe('getPosts :: default parameters', () => {
    it('should return list of published post', (done) => {
      const _id = Types.ObjectId()
      const publishedAt = Date.now()
      const author = {
        id: Types.ObjectId(),
        displayName: 'Natcha Luang - Aroonchai',
        email: 'me@nomkhonwaan.com'
      }
      
      PostMock
        .expects('find')
          .withArgs({ 
            publishedAt: { 
              '$exists': true 
            } 
          })
        .chain('select')
          .withArgs(publicFields.join(' '))
        .chain('limit')
          .withArgs(5)
        .chain('skip')
          .withArgs((1 - 1) * 5)
        .chain('sort')
          .withArgs({
            publishedAt: 'desc'
          })
        .chain('exec')
        .yields(null, [{
          _id,
          publishedAt,
          tags: [{
            name: 'AngularJS',
            slug: 'angularjs'
          }],
          title: '',
          users: [ author ],
          slug: '',
          markdown: '',
          html: ''
        }])
        
      agent
        .get('/api/v1/posts')
        .query({
          'page[number]': 1,
          'page[size]': 5,
          'include': 'author'
        })
        .end((err, resp) => {
          expect(err).to.be.null
          
          const posts = resp.body.data
          expect(posts[0].type).to.equal('posts')
          expect(posts[0].id).to.equal(_id.toString())
          expect(posts[0].attributes.publishedAt).to.equal(publishedAt)
          
          const tags = posts[0].attributes.tags
          expect(tags[0].name).to.equal('AngularJS')
          expect(tags[0].slug).to.equal('angularjs')
          
          const authors = posts[0].relationships.author.data
          expect(authors[0].type).to.equal('users')
          expect(authors[0].id).to.equal(author.id.toString())
          
          const users = resp.body.included
          expect(users[0].type).to.equal('users')
          expect(users[0].id).to.equal(author.id.toString())
          expect(users[0].attributes.displayName).to.equal(author.displayName)
          expect(users[0].attributes.email).to.equal(author.email)
          
          done()
        })
    })
  })
})