import React from 'react'
import PropTypes from 'prop-types'
import { PostTemplate } from '../../templates/post'

const PostPreview = ({ entry, widgetFor }) => {
  return (
    <PostTemplate
      content={widgetFor('body')}
      title={entry.getIn(['data', 'title'])}
    />
  )
}

PostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default PostPreview
