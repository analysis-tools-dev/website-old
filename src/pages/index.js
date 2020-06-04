import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const ComponentName = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Static analysis tools, linters, code quality for Python, Ruby, C, PHP,
          Go, and more
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <p tw="text-xl font-semibold pb-5">Popular Languages</p>
          <div tw="grid grid-cols-2 gap-3 ">
            {["python", "ruby", "php", "c", "javascript", "go"].map(l => (
              <div tw="border-b border-gray-200 pb-5 px-2">
                <a href={`/tag/${l}`} tw="capitalize mb-4 block">
                  <img
                    tw="hover:opacity-75 inline"
                    alt={l}
                    src={`/logos/${l}.svg`}
                  />
                  <span tw="text-xl font-semibold ml-3">{l}</span>
                </a>
                {data[l].nodes.map(t => (
                  <li key={t.id} tw="list-none">
                    <span tw="rounded-full px-4 mr-4 mb-3 bg-orange-300 text-white p-2 rounded-full leading-none inline-block">
                      {t.children[0].sum}
                    </span>
                    <Link to={t.fields.slug}>{t.name}</Link>
                  </li>
                ))}
                <Link
                  to={`tag/${l}`}
                  tw="float-right rounded-full  px-4 mr-2 bg-blue-400 text-white p-2 rounded-lg leading-none transition-all duration-300 hover:bg-blue-500"
                >
                  Check more
                </Link>
              </div>
            ))}
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  {
    python: allToolsYaml(
      filter: { tags: { glob: "python" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
    ruby: allToolsYaml(
      filter: { tags: { glob: "ruby" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
    php: allToolsYaml(
      filter: { tags: { glob: "php" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
    c: allToolsYaml(
      filter: { tags: { glob: "c" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
    javascript: allToolsYaml(
      filter: { tags: { glob: "javascript" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
    go: allToolsYaml(
      filter: { tags: { glob: "go" } }
      sort: { fields: childVotes___sum, order: DESC }
      limit: 3
    ) {
      nodes {
        name
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            key
          }
        }
      }
    }
  }
`
export default ComponentName
