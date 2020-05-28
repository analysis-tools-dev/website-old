import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import "twin.macro"

const getTitleText = tools => {
  if (tools.length < 3) {
    return "The best"
  } else {
    return `Best ${tools.length}`
  }
}

export default function Tag(d) {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  const titleText = getTitleText(tools)

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
          <h1 tw="text-3xl font-semibold pb-10">
            {tag.name} static analysis tools
          </h1>
          <p dangerouslySetInnerHTML={{ __html: d.data.markdownRemark.excerpt }} />

          {tools.map(tool => (
            <div tw="my-3 flex  border-b border-gray-200 pb-6" key={tool.id}>
              <p tw="flex-none w-12 text-center text-gray-600">
                <a tw="block" href={`/upVote/${tool.children[0].key}`}>
                  <FaCaretUp tw="m-auto text-3xl text-gray-400" />
                </a>

                <span tw="block text-color4 font-bold">
                  {tool.children[0].sum}
                </span>

                <a tw="block" href={`/downVote/${tool.children[0].key}`}>
                  <FaCaretDown tw="m-auto text-3xl text-gray-400" />
                </a>
              </p>
              <div tw="flex-auto pl-5">
                <Link to={tool.fields.slug} tw="pb-4">
                  <h4 tw="font-bold text-xl mb-3">{tool.name}</h4>
                </Link>
                <p tw="text-gray-600">{tool.description}</p>
              </div>
            </div>
          ))}
        </div>
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
      }
    }

    allToolsYaml(
      filter: { tags: { glob: $tag } }
      sort: { fields: childVotes___sum, order: DESC }
    ) {
      nodes {
        id
        name
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
