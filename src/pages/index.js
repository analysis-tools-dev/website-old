import React from "react"
import { graphql } from "gatsby"
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
          <div tw="grid grid-cols-3 gap-3">
            <a href="/tag/python">
              <img tw="hover:opacity-75" alt="Python" src="/logos/python.svg" />
            </a>
            <a href="/tag/ruby">
              <img tw="hover:opacity-75" alt="Ruby" src="/logos/ruby.svg" />
            </a>
            <a href="/tag/php">
              <img tw="hover:opacity-75" alt="PHP" src="/logos/php.svg" />
            </a>
            <a href="/tag/c">
              <img tw="hover:opacity-75" alt="C" src="/logos/c.svg" />
            </a>
            <a href="/tag/javascript">
              <img
                tw="hover:opacity-75"
                alt="JavaScript"
                src="/logos/javascript.svg"
              />
            </a>
            <a href="/tag/go">
              <img tw="hover:opacity-75" alt="Go" src="/logos/go.svg" />
            </a>
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  {
    allTagsYaml(sort: { fields: name, order: ASC }) {
      nodes {
        id
        name
        tag
        fields {
          slug
        }
      }
    }
  }
`
export default ComponentName
