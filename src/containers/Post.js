// containers/Post.js
// ------------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 29, 2016
//

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'

const Post = ({ year, month, date, slug }) => (
  <div></div>
)

const mapStateToProps = (state, ownProps) => ({
  year: ownProps.params.year,
  month: ownProps.params.month,
  date: ownProps.params.date,
  slug: ownProps.params.slug
})

Post.propTypes = {
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
}

export default connect(
  mapStateToProps
)(Post)