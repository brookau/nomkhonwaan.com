// test/api/controllers/posts.js
// -----------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 22, 2016
//

import _ from 'lodash'
import Express from 'express'
import request from 'supertest'
import { Types } from 'mongoose'

import { mock, stub } from 'sinon'
import { expect } from 'chai'
import 'sinon-mongoose'

import apiRoutes from '../../../src/api'
import { publicFields } from '../../../src/api/controllers/posts'
import { Post } from '../../../src/api/models'

// -- Stub --

const validAuthorsStub = [{
  id: Types.ObjectId(),
  displayName: 'Natcha Luang - Aroonchai',
  email: 'me@nomkhonwaan.com'
}]

const validPostsStub = [{
  _id: Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Ant',
    slug: 'ant'
  }],
  title: '[Stub] Ant',
  slug: 'stub-ant',
  markdown: 'Ant',
  html: '<p>Ant</p>',
  users: validAuthorsStub
}, {
  _id: Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Bird',
    slug: 'bird'
  }],
  title: '[Stub] Bird',
  slug: 'stub-bird',
  markdown: 'Bird',
  html: '<p>Bird</p>',
  users: validAuthorsStub
}, {
  _id: Types.ObjectId(),
  publishedAt: Date.now(),
  tags: [{
    name: 'Cat',
    slug: 'cat'
  }],
  title: '[Stub] Cat',
  slug: 'stub-cat',
  markdown: 'Cat',
  html: '<p>Cat</p>',
  users: validAuthorsStub
}]

// -- 

// ==========================================================================

// -- Test suite --

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
  
  describe('getPosts :: only published posts', () => {
    beforeEach(() => {
      PostMock
        .expects('count')
          .withArgs({
            publishedAt: {
              '$exists': true,
            }
          })
          .yields(null, 3)
    })
    
    afterEach(() => {
      PostMock.restore()
    })
        
    it('should return list of posts by default page parameters', (done) => {
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
        .yields(null, validPostsStub)
        
      agent
        .get('/api/v1/posts')
        .end((err, resp) => {
          expect(err).to.be.null
          
          const meta = resp.body.meta 
          expect(meta.totalItems).to.equal(3)
          
          const links = resp.body.links 
          expect(links.self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
          expect(links.next).to.be.undefined
          expect(links.previous).to.be.undefined
          
          const posts = resp.body.data
          expect(posts).to.have.length.of.at.most(5)
          expect(posts[0].type).to.equal('posts')
          expect(posts[0].id).to.equal(validPostsStub[0]._id.toString())
          expect(posts[0].attributes.publishedAt).to.equal(validPostsStub[0].publishedAt)
          
          const tags = posts[0].attributes.tags
          expect(tags[0].name).to.equal(validPostsStub[0].tags[0].name)
          expect(tags[0].slug).to.equal(validPostsStub[0].tags[0].slug)
          
          const authors = posts[0].relationships.author.data
          expect(authors[0].type).to.equal('users')
          expect(authors[0].id).to.equal(validAuthorsStub[0].id.toString())
          
          const users = resp.body.included
          expect(users).to.have.lengthOf(1)
          expect(users[0].type).to.equal('users')
          expect(users[0].id).to.equal(validAuthorsStub[0].id.toString())
          expect(users[0].attributes.displayName).to.equal(validAuthorsStub[0].displayName)
          expect(users[0].attributes.email).to.equal(validAuthorsStub[0].email)
          
          done()
        })
    })
    
    it('should return list of posts by specific page parameters', (done) => {
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
          .withArgs(1)
        .chain('skip')
          .withArgs((2 - 1) * 1)
        .chain('sort')
          .withArgs({
            publishedAt: 'desc'
          })
        .chain('exec')
        .yields(null, validPostsStub.slice(1, 2))
      
      agent
        .get('/api/v1/posts')
        .query({
          'page[number]': 2,
          'page[size]': 1
        })
        .end((err, resp) => {
          expect(err).to.be.null
          
          const meta = resp.body.meta
          expect(meta.totalItems).to.equal(3)
          
          const links = resp.body.links
          expect(links.self).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=1).*$/)
          expect(links.next).to.match(/(?=.*page\[number\]\=3)(?=.*page\[size\]\=1).*$/)
          expect(links.previous).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=1).*$/)
         
          const posts = resp.body.data
          expect(posts).to.have.length.of.at.most(1)
          expect(posts[0].type).to.equal('posts')
          expect(posts[0].id).to.equal(validPostsStub[1]._id.toString())
          expect(posts[0].attributes.publishedAt).to.equal(validPostsStub[1].publishedAt)
          
          const tags = posts[0].attributes.tags
          expect(tags[0].name).to.equal(validPostsStub[1].tags[0].name)
          expect(tags[0].slug).to.equal(validPostsStub[1].tags[0].slug)
          
          const authors = posts[0].relationships.author.data
          expect(authors[0].type).to.equal('users')
          expect(authors[0].id).to.equal(validAuthorsStub[0].id.toString())
          
          const users = resp.body.included
          expect(users).to.have.lengthOf(1)
          expect(users[0].type).to.equal('users')
          expect(users[0].id).to.equal(validAuthorsStub[0].id.toString())
          expect(users[0].attributes.displayName).to.equal(validAuthorsStub[0].displayName)
          expect(users[0].attributes.email).to.equal(validAuthorsStub[0].email)
          
          done()
        })
    })
  })
})

// --