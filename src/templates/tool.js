import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"
import { FaTags, FaHome } from "react-icons/fa"

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
          <h1 tw="text-3xl font-semibold pb-5">{tool.name}</h1>
          <p tw="pb-3">{tool.description}</p>
          <div tw="flex mt-3">
            <FaHome tw="mt-1 mr-2" />
            <a tw="underline" href={tool.url}>{tool.url}</a>
          </div>
          <div tw="flex mt-3">
            <FaTags tw="mt-2 mr-2" />
            <ul tw="flex flex-wrap list-none max-w-sm">
              {tool.tags.map(tag => (
                <li tw="mt-1 mr-1 mb-1" key={tool.id}>
                  <a href={"/tag/" + tag}>
                    <span tw="bg-color-gray-200 px-2 py-1 rounded">{tag}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
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
