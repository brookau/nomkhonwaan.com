// components/Nav.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created May 4, 2016
//

import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { onClickMenuButton } from '../actions'

const Nav = ({ dispatch, isExpanded }) => {
  const styles = require('../stylesheets/components/Nav.scss')
  const menuItems = [{
    title: 'Home',
    href: 'https://www.nomkhonwaan.com'
  }, {
    title: 'GitHub',
    href: 'https://github.com/nomkhonwaan'
  }, {
    title: 'Twitter',
    href: 'https://twitter.com/nomkhonwaan'
  }, {
    title: 'LinkedIn',
    href: 'https://linkedin.com/in/nomkhonwaan'
  }, {
    title: 'RSS',
    href: 'https://www.nomkhonwaan.com/rss'
  }]
  
  return (
    <nav className={styles['layout-nav']}>
      <ul className={classNames(
        styles['menu-list'], 
        styles._unpadding, 
        styles._unmargin, 
        { [styles.expanded]: isExpanded }
      )}>
        {menuItems.map((item, key) => 
          <li className={styles['menu-item']} key={key}>
            <a href={item.href}>
              {item.title}
            </a>
          </li>)}
      </ul>
      <button className={styles['btn-toggle']} onClick={() => {
        dispatch(onClickMenuButton( ! isExpanded))
        
        document.getElementsByTagName('body')[0][( ! isExpanded
          ? 'addEventListener'
          : 'removeEventListener')]
          ('touchmove', (event) => {
            event.preventDefault()
          })
      }}>
        Menu
      </button>
    </nav>
  )
}

const mapStateToProps = (state) => {
  return {
    isExpanded: state.myApp.isExpanded
  }
}

export default connect(
  mapStateToProps
)(Nav)
