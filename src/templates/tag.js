import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"
import ToolsList from "../components/tools-list"
import SponsorBanner from "../components/sponsorbanner"

const getTitleText = tools => {
  if (tools.length < 3) {
    return "The best"
  } else {
    return `Best ${tools.length}`
  }
}

const Tag = d => {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  const titleText = getTitleText(tools)

  const maintained = tools.filter(tool => !tool.deprecated)
  const deprecated = tools.filter(tool => tool.deprecated)

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {titleText} {tag.name} static analysis tools and linters
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold ">
            {titleText} {tag.name} static analysis tools
          </h1>
          {d.data.markdownRemark && (
            <div tw="pt-6">
              <h3 tw="text-xl font-semibold pb-5">What is {tag.name}?</h3>
              <p>
                <span
                  tw="inline"
                  dangerouslySetInnerHTML={{
                    __html: d.data.markdownRemark.excerpt,
                  }}
                />
                <a
                  tw="underline inline"
                  href={d.data.markdownRemark.frontmatter.source}
                >
                  (Source)
                </a>
              </p>
            </div>
          )}
        </div>

        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          {/* Only show header when we have the SEO text block above it */}
          {d.data.markdownRemark && (
            <h3 tw="text-xl font-semibold pb-5">
              What are the best {tag.name} analysis tools?
            </h3>
          )}
          {maintained.map(tool => (
            <ToolsList tool={tool} key={tool.id} />
          ))}
          {deprecated.length > 0 && (
            <h3 tw="text-xl font-semibold pb-5">
              Deprecated/unmaintained tools
            </h3>
          )}
          {deprecated.map(tool => (
            <div tw="opacity-50">
              <ToolsList tool={tool} key={tool.id} />
            </div>
          ))}
          <SponsorBanner />
        </div>
        <p tw="px-6 pb-6 text-gray-600">
          Missing an entry? Please{" "}
          <a
            tw="underline"
            href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
          >
            let us know.
          </a>
        </p>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $tag: String!) {
    tagsYaml(fields: { slug: { eq: $slug } }) {
      name
      tag
      fields {
        slug
      }
    }

    markdownRemark(frontmatter: { tag: { eq: $tag } }) {
      excerpt(format: HTML, pruneLength: 500)
      frontmatter {
        tag
        source
      }
    }

    allToolsYaml(
      filter: { tags: { glob: $tag } }
      sort: { fields: childVotes___sum, order: DESC }
    ) {
      nodes {
        id
        name
        proprietary
        deprecated
        description
        tags
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            downVotes
            upVotes
            key
          }
        }
      }
    }
  }
`

export default Tag
