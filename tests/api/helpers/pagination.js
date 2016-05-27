// tests/api/helpers/pagination.js
// -------------------------------
// 
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 27, 2016
//

import { expect } from 'chai'
import { parse } from 'url'
import { pagination } from '../../../src/api/helpers'

describe('api/helpers/pagination.js', () => {
  it('sholud return only self link', () => {
    const { self, next, previous } = pagination(1, )  
  })
  
  it('should return only self and next links', () => {
    const { self, next, previous } = pagination(1, 5, 30, '/api/v1/posts?page[number]=1&page[size]=5')
    
    expect(self).to.equal('/api/v1/posts?page[number]=1&page[size]=5')
    expect(next).to.equal('/api/v1/posts?page[number]=2&page[size]=5')
    expect(previous).to.be.undefined
  })
  
  it('should return self, next and previous links', () => {
    
  })
})