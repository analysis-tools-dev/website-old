import React from "react"
import { Link, graphql } from "gatsby"
import Vote from "../components/vote"
import Layout from "../components/layout_wide"
import "twin.macro"


const Compare = d => {
let tools = d.data.allToolsYaml.nodes;
tools = tools.filter(t =>t.children[0].sum >= 10)
tools = tools.sort();
  return (
    <Layout>
      <article tw="shadow w-full p-2 md:p-8">
        <h1 tw="text-3xl font-semibold pb-10">Compare {tools.length} Analysis Tools</h1>
        <table tw="w-full overflow-x-auto block border">
          <thead>
            <tr>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">Votes</th>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">Tool</th>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">Category</th>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">Type</th>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">Tags</th>
              <th tw="sticky top-0 px-6 py-2 text-gray-900 bg-gray-100">License</th>
            </tr>
          </thead>
          <tbody tw="divide-y">
            {tools.map(tool => (
              <tr>
              <td tw="text-center px-6 py-2">
                <Vote k={tool.children[0].key} sum={tool.children[0].sum} />
                </td>
                <td tw="text-center px-6 py-2">
                  <Link to={tool.fields.slug} tw="underline">
                    {tool.name}
                  </Link>
                </td>
                <td tw="text-center px-6 py-2">{tool.categories.join(", ")}</td>
                <td tw="text-center px-6 py-2 ">{tool.types.join(", ")}</td>
                <td tw="text-center px-6 py-2">
                  <ul tw="list-none max-w-sm inline-block align-top">
                    {tool.tags &&
                      tool.tags.slice(0, 3).map(tag => (
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
                    {tool.tags.length > 3 && (
                      <a href={tool.fields.slug}>
                        <span tw="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded">
                          more...
                        </span>
                      </a>
                    )}
                  </ul>
                </td>
                <td tw="text-center px-6 py-2">{tool.license}</td>
              </tr>
            )
)}
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
        tags
        types
        fields {
          slug
          githubStats {
            stargazers_count
          }
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
export default Compare

