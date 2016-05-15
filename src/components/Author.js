// components/Author.js
// --------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React from 'react'
import classNames from 'classnames'

const Author = () => {
  const styles = require('../stylesheets/Author.scss')
  
  return (
    <div className={styles.author}>
      <a href="https://www.nomkhonwaan.com" className={classNames(styles.avatar, styles._center)}>
        <img src={require('../images/avatar.jpg')} alt="" />
      </a>
      <h2 className={classNames(styles.description, styles._center)}>Trust me I'm Petdo</h2>
      <div className={classNames(styles.location, styles._center)}>Bangkok, Thailand</div>
    </div>
  )
}

export default Author