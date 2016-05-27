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
  const styles = Object.assign({}, 
    require('../stylesheets/Nav.scss'),
    require('font-awesome/scss/font-awesome.scss')
  )
  
  return (
    <nav className={styles['layout-nav']}>
      <ul className={classNames(
        styles['menu-list'], 
        styles._unpadding, 
        styles._unmargin, 
        { [styles.expanded]: isExpanded }
      )}>
        {[{
          title: 'Home',
          href: '//www.nomkhonwaan.com',
          iconClass: [
            styles.fa,
            styles['fa-fw'],
            styles['fa-home'] 
          ]
        }, {
          title: 'GitHub',
          href: '//github.com/nomkhonwaan',
          iconClass: [
            styles.fa,
            styles['fa-fw'],
            styles['fa-github-square']
          ]
        }, {
          title: 'Twitter',
          href: '//twitter.com/nomkhonwaan',
          iconClass: [
            styles.fa,
            styles['fa-fw'],
            styles['fa-twitter-square']
          ]
        }, {
          title: 'LinkedIn',
          href: '//linkedin.com/in/nomkhonwaan',
          iconClass: [
            styles.fa,
            styles['fa-fw'],
            styles['fa-linkedin-square']
          ]
        }, {
          title: 'RSS',
          href: '//www.nomkhonwaan.com/rss',
          iconClass: [
            styles.fa,
            styles['fa-fw'],
            styles['fa-rss-square']
          ]
        }].map((item, key) => 
          <li className={styles['menu-item']} key={key}>
            <a href={item.href}>
              <i className={classNames(item.iconClass)}></i>&nbsp;{item.title}
            </a>
          </li>)}
      </ul>
      <button className={styles['btn-toggle']} onClick={() => {
        dispatch(onClickMenuButton(isExpanded))
        
        document.getElementsByTagName('body')[0][(isExpanded
          ? 'addEventListener'
          : 'removeEventListener')]
          ('touchmove', (event) => {
            event.preventDefault()
          })
      }}>
        <i className={classNames(styles.fa, styles['fa-fw'], styles['fa-bars'])}></i>&nbsp;Menu
      </button>
    </nav>
  )
}

export default connect(
  (state) => ({
    isExpanded: state.myApp.isExpanded
  })
)(Nav)