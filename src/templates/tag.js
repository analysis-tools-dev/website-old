import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

export default function Tag(d) {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  return (
    <Layout>
      <div>
        <h1>{tag.name}</h1>
      </div>
      <div>
        {tools.map(tool => (
          <div key={tool.id}>
            <Link to={tool.fields.slug}>{tool.name}</Link>
            <p>{tool.description}</p>
            <p>
              {tool.tags.map(tag => (
                <span key={tag}>
                  <small>{tag}</small>
                </span>
              ))}
            </p>
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
