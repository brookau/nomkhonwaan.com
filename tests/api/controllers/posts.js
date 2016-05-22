// test/api/controllers/posts.js
// -----------------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 22, 2016
//

import Express from 'express'
import request from 'supertest'
import { stub } from 'sinon'
import { expect } from 'chai'
import apiRoutes from '../../../src/api'

describe('api/controllers/posts.js', () => {
  let app, agent 
  
  before((done) => {
    app = Express()
    app.use('/api/v1', apiRoutes)
    
    agent = request.agent(app)
    
    done()
  })
  
  after((done) => {
    done()
  })
  
  describe('getPosts :: by default parameters', () => {
    it('should return list of published post', (done) => {
      agent
        .get('/api/v1/posts')
        .expect(200, done)
    })
  })
})