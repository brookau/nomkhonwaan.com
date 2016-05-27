// containers/App.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React, { PropTypes, Component } from 'react'
import Helmet from 'react-helmet'
import { Footer, Header } from '../components'

const App = ({ children }) => {
  return (
    <div className="myApp">
      <Helmet 
        title="Nomkhonwaan"
        titleTemplate="%s &middot; Trust me I'm Petdo" />
      <Header />
      {children}
      <Footer />
    </div>
  )
}

App.propTypes = {
  children: PropTypes.node.isRequired
}

export default App