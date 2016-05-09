// components/Header.js
// --------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'
import { Author, Nav } from './'

const Header = () => (
  <header className="layout-header">
    <Nav />
    <Author />
  </header>
)

export default Header
