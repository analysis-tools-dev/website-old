import { Link, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    return (
      <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Blog - Static analysis tools, linters, code quality</title>
      </Helmet>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <article tw="flex flex-col shadow my-4">
                <div tw="bg-white flex flex-col justify-start p-6">
                  <h1 tw="text-xl font-semibold pb-5">
                    <Link to={node.fields.slug}>{title}</Link>
                  </h1>
                  <small>{node.frontmatter.date}</small>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.excerpt,
                    }}
                  />
                </div>
              </article>
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
