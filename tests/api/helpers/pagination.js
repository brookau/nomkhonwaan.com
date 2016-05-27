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
    const { self, next, previous } = pagination(1, 1, 1, '/api/v1/posts?page[size]=1')
    
    expect(self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=1).*$/)
    expect(next).to.be.undefined
    expect(previous).to.be.undefined  
  })
  
  it('should return only self and next links', () => {
    const { self, next, previous } = pagination(1, 5, 30, '/api/v1/posts?page[number]=1&page[size]=5')
    
    expect(self).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
    expect(next).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=5).*$/)
    expect(previous).to.be.undefined
  })
  
  it('should return self, next and previous links', () => {
    const { self, next, previous } = pagination(2, 5, 20, '/api/v1/posts?page[number]=2')
    
    expect(self).to.match(/(?=.*page\[number\]\=2)(?=.*page\[size\]\=5).*$/)
    expect(next).to.match(/(?=.*page\[number\]\=3)(?=.*page\[size\]\=5).*$/)
    expect(previous).to.match(/(?=.*page\[number\]\=1)(?=.*page\[size\]\=5).*$/)
  })
})