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
  const faStyles = require('font-awesome.css')
  
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
            faStyles.fa,
            faStyles['fa-fw'],
            faStyles['fa-home'] 
          ]
        }, {
          title: 'GitHub',
          href: '//github.com/nomkhonwaan',
          iconClass: [
            faStyles.fa,
            faStyles['fa-fw'],
            faStyles['fa-github-square']
          ]
        }, {
          title: 'Twitter',
          href: '//twitter.com/nomkhonwaan',
          iconClass: [
            faStyles.fa,
            faStyles['fa-fw'],
            faStyles['fa-twitter-square']
          ]
        }, {
          title: 'LinkedIn',
          href: '//linkedin.com/in/nomkhonwaan',
          iconClass: [
            faStyles.fa,
            faStyles['fa-fw'],
            faStyles['fa-linkedin-square']
          ]
        }, {
          title: 'RSS',
          href: '//www.nomkhonwaan.com/rss',
          iconClass: [
            faStyles.fa,
            faStyles['fa-fw'],
            faStyles['fa-rss-square']
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
