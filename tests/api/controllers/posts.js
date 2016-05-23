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
          users: [ author ],
          slug: '',
          markdown: '',
          html: ''
        }])
        
      agent
        .get('/api/v1/posts')
        .query({
          'page[number]': 1,
          'page[size]': 5
        })
        .end((err, resp) => {
          expect(err).to.be.null
          
          const [ post ] = resp.body.data
          expect(post.type).to.equal('posts')
          expect(post.id).to.equal(_id.toString())
          expect(post.attributes.publishedAt).to.equal(publishedAt)
          
          const [ tag ] = post.attributes.tags
          expect(tag.name).to.equal('AngularJS')
          expect(tag.slug).to.equal('angularjs')
          
          const [ author ] = post.relationships.author.data
          expect(author.type).to.equal('users')
          expect(author.id).to.equal(user.id)
          
          const [ user ] = resp.body.included
          expect(user.type).to.equal('users')
          expect(user.id).to.equal(user.id)
          expect(user.attributes.displayName).to.equal(user.displayName)
          expect(user.attributes.email).to.equal(user.email)
          
          done()
        })
    })
  })
})