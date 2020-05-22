import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"

export default function BlogPost(d) {
  const tool = d.data.toolsYaml
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{tool.name} Details</title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">{tool.name}</h1>
          <p>{tool.description}</p>
          <a href={tool.url}>{tool.url}</a>
          <ul tw="flex flex-wrap list-none max-w-sm">
            {tool.tags.map(tag => (
              <li tw="mt-1 mr-1 mb-1" key={tool.id}>
                <span tw="bg-color1 px-1 py-1">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    toolsYaml(fields: { slug: { eq: $slug } }) {
      name
      description
      url
      tags
      fields {
        slug
      }
    }
  }
`
