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
          Analysis tools, linters, code quality checkers for{" "}
          {data.languages.nodes.length.toString()} languages
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">Tools for Various Programming Languages</h1>
          <ul>
            {data.languages.nodes.map(t => (
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
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">Tools for Markup Languages and More</h1>
          <ul>
            {data.other.nodes.map(t => (
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
    languages: allTagsYaml(
      filter: { type: { glob: "language" } } 
      sort: { fields: name, order: ASC }) {
      nodes {
        id
        name
        tag
        type
        fields {
          slug
        }
      }
    }
    other: allTagsYaml(
      filter: { type: { glob: "other" } } 
      sort: { fields: name, order: ASC }) {
      nodes {
        id
        name
        tag
        type
        fields {
          slug
        }
      }
    }
  }
`
export default ComponentName
