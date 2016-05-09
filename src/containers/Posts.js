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

const Posts = ({ year, month, date }) => (
  <div></div>
)

const mapStateToProps = (state, ownProps) => ({
  year: ownProps.params.year,
  month: ownProps.params.month,
  date: ownProps.params.date
})

Posts.propTypes = {
  year: PropTypes.string,
  month: PropTypes.string,
  date: PropTypes.string
}

export default connect(
  mapStateToProps
)(Posts)
