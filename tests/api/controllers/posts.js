// test/api/controllers/posts.js
// -----------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 22, 2016
//

import Express from 'express'
import request from 'supertest'
import { mock, stub } from 'sinon'
import { expect } from 'chai'
import 'sinon-mongoose'

import apiRoutes from '../../../src/api'
import { publicFields } from '../../../src/api/controllers/posts'
import { Post } from '../../../src/api/models'


describe('api/controllers/posts.js', () => {
  let agent, PostMock
  
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
  
  describe('getPosts :: by default parameters', () => {
    it('should return list of published post', (done) => {
      PostMock
        .expects('find').withArgs({ 
          publishedAt: { 
            '$exists': true 
          } 
        })
        .chain('select').withArgs(publicFields.join(' '))
        .chain('limit').withArgs(5)
        .chain('skip').withArgs((1 - 1) * 5)
        .chain('sort').withArgs({
          publishedAt: 'desc'
        })
        .chain('exec')
        .yields(null)
        
      agent
        .get('/api/v1/posts?page[number]=1&page[size]=5')
        .query({
          'page[number]': 1,
          'page[size]': 5
        })
        .end((err, data) => {
          done()
        })
    })
  })
})