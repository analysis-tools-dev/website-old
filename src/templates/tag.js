import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"
import ToolsList from "../components/tools-list"
import SponsorBanner from "../components/sponsorbanner"
import {getRandomInt} from "../../utils/random"

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

  const bannerPosition = getRandomInt(tools.length);
  const toolsBefore = tools.splice(0, bannerPosition);
  const toolsAfter = tools;

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
            {introText} {tag.name} static analysis tools
          </h1>
          <p dangerouslySetInnerHTML={{ __html: d.data.markdownRemark.excerpt }} />

          {toolsBefore.map(tool => (
            <ToolsList tool={tool} key={tool.id} />
          ))}
          <SponsorBanner />

          {toolsAfter.map(tool => (
            <ToolsList tool={tool} key={tool.id} />
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
