// components/Footer.js
// --------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'

const Footer = () => {
  const styles = require('stylesheets/Footer.scss')
  
  return (
    <footer className={styles['layout-footer']}>
      &copy;&nbsp;{new Date().getFullYear()}&nbsp;&middot;&nbsp;<strong className="copyright">www.nomkhonwaan.com</strong>&nbsp;&middot;&nbsp;Powered by&nbsp;<a href="https://facebook.github.io/react/" className="poweredby" title="React"><strong>React</strong></a>
    </footer>
  )
}

export default Footer