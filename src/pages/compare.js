import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout_wide"
import "twin.macro"

const Compare = d => {
  const tools = d.data.allToolsYaml.nodes
  return (
    <Layout>
      <article tw="shadow w-full p-8">
        <h1 tw="text-3xl font-semibold pb-10">Compare All Tools</h1>
        <table class="table-auto w-full relative border">
          <thead>
            <tr>
              <th tw="sticky top-0 px-6 py-3 text-gray-900 bg-gray-100">
                Tool
              </th>
              <th tw="sticky top-0 px-6 py-3 text-gray-900 bg-gray-100">
                Category
              </th>
              <th tw="sticky top-0 px-6 py-3 text-gray-900 bg-gray-100">
                Type
              </th>
              <th tw="sticky top-0 px-6 py-3 text-gray-900 bg-gray-100">
                License
              </th>
              <th tw="sticky top-0 px-6 py-3 text-gray-900 bg-gray-100">
                Tags
              </th>
            </tr>
          </thead>
          <tbody tw="divide-y">
            {tools.map(tool => (
              <tr>
                <td tw="px-6 py-4 text-center">
                  <Link to={tool.fields.slug} tw="underline pb-4 flex">
                    {tool.name}
                  </Link>
                </td>
                <td tw="px-6 py-4 text-center">{tool.categories.join(", ")}</td>
                <td tw="px-6 py-4 text-center">{tool.types.join(", ")}</td>
                <td tw="px-6 py-4 text-center">{tool.license}</td>
                <td tw="px-6 py-4 text-center">
                  <ul tw="list-none max-w-sm inline-block align-top">
                    {tool.tags.map(tag => (
                      <li
                        tw="mb-2 mr-1 inline-block"
                        key={`${tool.fields.slug}${tag}`}
                      >
                        <a href={"/tag/" + tag}>
                          <span tw="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded">
                            {tag}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </Layout>
  )
}

export const query = graphql`
  {
    allToolsYaml {
      nodes {
        categories
        deprecated
        discussion
        license
        name
        proprietary
        tags
        types
        fields {
          slug
          githubStats {
            stargazers_count
          }
        }
      }
    }
  }
`
export default Compare
