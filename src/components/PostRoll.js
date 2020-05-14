import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'


class PostRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <section className="container">
        {posts &&
          posts.map(({ node: post }) => (
              <article>
                <header>

                  {post.frontmatter.featuredimage ? (
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                        }}
                      />
                  ) : null}

                  <p className="post-meta">
                    <Link to={post.fields.slug}>
                      {post.frontmatter.prompt}
                    </Link>
                    <span>{post.frontmatter.date}</span>
                  </p>
                </header>
                <p>{post.html}</p>
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
              html
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                prompt
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
        }
      }
    `}
    render={(data, count) => <PostRoll data={data} count={count} />}
  />
)
