import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"

const NotFound = () => {
  return (
    <Layout>
      <div>
        <h1>Page not found!!!</h1>
        Go to <Link to="/">home page</Link> or enjoy the picture:
        <img src="https://picsum.photos/seed/picsum/800/600" alt="" />
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
export default NotFound
