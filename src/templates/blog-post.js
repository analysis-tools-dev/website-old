import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{post.frontmatter.title} - Static analysis tools, linters, code quality</title>
      </Helmet>
      <article>
        <header>
          <h1 tw="text-xl font-semibold pb-5">{post.frontmatter.title}</h1>
          <small>{post.frontmatter.date}</small>
        </header>
        <section
          tw="py-5 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
        <hr />
      </article>

      <nav>
        <ul tw="flex flex-wrap justify-between list-none p-0 pt-2 leading-loose">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
