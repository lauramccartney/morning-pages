import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import { Helmet } from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'

export const PostTemplate = ({
  content,
  contentComponent,
  title,
  prompt,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section>
      {helmet || ''}
      <h1>
        {prompt}
      </h1>
      <PostContent content={content} />
    </section>
  )
}

PostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  title: PropTypes.string,
  prompt: PropTypes.string,
  helmet: PropTypes.object,
}

const Post = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <PostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Post">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="prompt"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Post.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Post

export const pageQuery = graphql`
  query PostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        prompt
      }
    }
  }
`
