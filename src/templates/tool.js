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
      fields {
        slug
      }
    }
  }
`
