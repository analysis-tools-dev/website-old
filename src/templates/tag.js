import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"

export default function Tag(d) {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tag.name} static analysis tools</title>
      </Helmet>
      <div tw="pb-5">
        <h1>{tag.name} static analysis tools</h1>
        <p></p>
      </div>
      <div>
        {tools.map(tool => (
          <div tw="pb-3" key={tool.id}>
            <h3>
              <Link to={tool.fields.slug}>{tool.name}</Link>
            </h3>
            <p tw="pl-5">{tool.description}</p>
          </div>
        ))}
      </div>
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
