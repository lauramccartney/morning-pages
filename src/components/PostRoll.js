import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Curlicue from '../components/Curlicue'

class PostRoll extends React.Component {


  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="container">

        {posts &&
          posts.map(({ node: post }) => (
              <article>
                  <div className="inner-wrapper">
                    <header>
                      <p className="prompt">
                        <Link to={post.fields.slug}>
                          {post.frontmatter.prompt}
                        </Link>
                      </p>
                    </header>
                  </div>

                  {post.frontmatter.featuredimage ? (
                    <div className="featured-image">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                    </div>
                  ) : null}

                  <div className="inner-wrapper">
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />

                    <p className="attribution">by {post.frontmatter.writer}</p>
                  </div>
                <Curlicue />
              </article>

          ))}
      </section>
    )
  }
}

PostRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query PostRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "post" } } }
        ) {
          edges {
            node {
              id
              excerpt(format: HTML, pruneLength: 2500)
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                prompt
                writer
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 800, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <PostRoll data={data} count={count} />}
  />
)
