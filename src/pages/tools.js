import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const ComponentName = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Static analysis tools, linters, code quality in{" "}
          {data.allTagsYaml.nodes.length.toString()} categories
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">Tools by Language</h1>
          <ul>
            {data.allTagsYaml.nodes.map(t => (
              <li key={t.id}>
                <p tw="pb-5">
                  <strong>
                    <Link to={t.fields.slug}>{t.name}</Link>
                  </strong>
                </p>
              </li>
            ))}
          </ul>
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
