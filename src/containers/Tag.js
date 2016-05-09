// containers/Tag.js
// -----------------
//
// @author  Natcha Luang - Aroonchai <me@nomkhonwaan.com>
// @created April 30, 2016
//

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Tag = ({ slug }) => (
  <div></div>
)

Tag.propTypes = {
  slug: PropTypes.string.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  slug: ownProps.params.slug
})

export default connect(
  mapStateToProps
)(Tag)
