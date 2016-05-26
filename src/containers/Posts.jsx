// containers/Posts.js
// -------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

/**
 * Posts component
 *
 * @param year  String  Publish year
 * @param month String  Publish month
 * @param date  String  Publish date
 */
class Posts extends Component {
  constructor({ year, month, date}) {
    super()
    
    this.propTypes = {
      year: PropTypes.string,
      month: PropTypes.string,
      date: PropTypes.string
    }
  }
  
  render() {
    return (
      <div></div>
    )
  }
}

export default connect((state, ownProps) => ({
  year: ownProps.params.year,
  month: ownProps.params.month,
  date: ownProps.params.date
}))(Posts)