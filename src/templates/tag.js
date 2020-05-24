import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"

const getIntroText = tools => {
  if (tools.length < 3) {
    return "The best"
  } else {
    return `Best ${tools.length}`
  }
}

export default function Tag(d) {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  const introText = getIntroText(tools)

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {introText} {tag.name} static analysis tools and linters
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">
            {tag.name} static analysis tools
          </h1>
          <ul>
            {tools.map(tool => (
              <li tw="pr-3 pb-6" key={tool.id}>
                <Link to={tool.fields.slug} tw="font-bold">
                  {tool.name}
                </Link>
                <p tw="">{tool.description}</p>
              </li>
            ))}
          </ul>
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

    allToolsYaml(
      filter: { tags: { glob: $tag } }
      sort: { order: ASC, fields: name }
    ) {
      nodes {
        id
        name
        description
        tags
        fields {
          slug
        }
      }
    }
  }
`
