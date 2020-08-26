import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const ComponentName = ({ data }) => {
  const totalCount = data.allToolsYaml.totalCount.toString()
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Compare {totalCount}+ Analysis Tools For Python, Ruby, C, PHP, Go,...
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <p tw="text-xl font-semibold pb-5">
            Most Popular Analysis Tools by Programming Language
          </p>
          <div tw="grid grid-cols-2 gap-3 ">
            {[
              "python",
              "ruby",
              "php",
              "c",
              "javascript",
              "go",
              "csharp",
              "java",
            ].map(l => (
              <div key={l} tw="border-b border-gray-200 pb-5 px-2">
                <Link to={`/tag/${l}`} tw="capitalize mb-4 block">
                  <img
                    tw="hover:opacity-75 inline"
                    alt={l}
                    src={`/logos/${l}.svg`}
                  />
                  <span tw="text-xl font-semibold ml-3">{l}</span>
                </Link>
                {data[l].nodes.map(t => (
                  <li key={`${l}_${t.fields.slug}`} tw="list-none">
                    <span tw="rounded-full px-4 mr-4 mb-3 bg-orange-300 text-white p-2 rounded-full leading-none inline-block">
                      {t.children[0].sum}
                    </span>
                    <Link to={t.fields.slug}>{t.name}</Link>
                  </li>
                ))}
                <Link
                  to={`/tag/${l}`}
                  tw="rounded-full px-4 mr-2 bg-gray-400 text-white p-2 rounded leading-none whitespace-no-wrap transition-all duration-300 hover:bg-gray-600"
                >
                  Show {data[l].totalCount - 3} more
                </Link>
              </div>
            ))}
          </div>
          <Link
            to="/tools"
            tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 duration-300 transition-all flex items-center justify-center px-2 py-3 mt-4"
          >
            Show all languages
          </Link>
        </div>
      </article>
      <div tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <p tw="pb-5">Latest from the Blog</p>
          {data["blog"].edges.map(e => (
            <h1>
              <Link to={`${e.node.childMarkdownRemark.fields.slug}`}>
                <h1 tw="text-xl font-semibold pb-5 underline">
                  {e.node.childMarkdownRemark.frontmatter.title}
                </h1>
                <p class="text-justify">{e.node.childMarkdownRemark.excerpt}</p>
              </Link>
            </h1>
          ))}
        </div>
      </div>
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
      totalCount
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
      totalCount
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
      totalCount
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
      totalCount
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
      totalCount
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
      totalCount
    }
    csharp: allToolsYaml(
      filter: { tags: { glob: "csharp" } }
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
      totalCount
    }
    java: allToolsYaml(
      filter: { tags: { glob: "java" } }
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
      totalCount
    }
    allToolsYaml {
      totalCount
    }
    blog: allFile(
      sort: { order: DESC, fields: childMarkdownRemark___frontmatter___date }
      filter: {
        internal: { mediaType: { eq: "text/markdown" } }
        sourceInstanceName: { eq: "blog" }
      }
      limit: 1
    ) {
      edges {
        node {
          childMarkdownRemark {
            excerpt
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
    }
  }
`
export default ComponentName
