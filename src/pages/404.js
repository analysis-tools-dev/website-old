import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const ComponentName = ({ data }) => {
  return (
    <Layout>
      <div>
        <h1>Page not found</h1>
        Go to <Link to="/">home page</Link> or enjoy the picture:
        <img
          src="https://picsum.photos/seed/picsum/800/600"
          alt="Nice picture"
        />
      </div>
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
