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
        <title>
          {post.frontmatter.title} - Static analysis tools, linters, code
          quality
        </title>
      </Helmet>
      <article tw="flex flex-col shadow w-full">
        <div tw="flex flex-col justify-start p-6 w-full">
          <header>
            <h1 tw="text-3xl font-semibold pb-5">{post.frontmatter.title}</h1>
            <p>{post.frontmatter.date}</p>
          </header>
          <section
            id="blogPostBody"
            tw="py-5 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
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
