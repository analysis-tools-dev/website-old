import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"

const ComponentName = ({ data }) => {
  return (
    <Layout>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-xl font-semibold pb-5">Programming languages</h1>
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
