import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const PostTemplate = ({
  content,
  contentComponent,
  title,
  prompt,
  writer,
  featuredimage,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="container">
      <article>
        <div className="inner-wrapper">
          <header>
            <h2 className="prompt">
                {prompt}
            </h2>
          </header>
        </div>

        {featuredimage ? (
          <div className="featured-image">
            <PreviewCompatibleImage
              imageInfo={{
                image: featuredimage,
                alt: `featured image thumbnail for post ${title}`,
              }}
            />
          </div>
        ) : null}

        <div className="inner-wrapper">
          <PostContent content={content} />
          <p className="attribution">by {writer}</p>
        </div>
      </article>
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
        prompt={post.frontmatter.prompt}
        writer={post.frontmatter.writer}
        featuredimage={post.frontmatter.featuredimage}
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
        title
        prompt
        writer
        featuredimage {
          childImageSharp {
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
