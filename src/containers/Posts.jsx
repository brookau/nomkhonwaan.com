// containers/Posts.js
// -------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React, { PropTypes } from 'react'
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
function Posts({ year, month, date }) {
  return (
    <div></div>
  )
}

function mapStateToProps(state, ownProps) {
  return {
    year: ownProps.params.year,
    month: ownProps.params.month,
    date: ownProps.params.date
  }
}

Posts.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  date: PropTypes.string
}

export default connect(
  mapStateToProps
)(Posts)
