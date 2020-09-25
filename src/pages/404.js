import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"

const NotFound = () => {
  return (
    <Layout>
      <article tw="shadow my-4 w-full p-4">
        <h1 tw="text-3xl font-semibold mb-5">Page not found</h1>
        <p tw="p-4">
          The page you are looking for does not exist.
          <br />
          How about going{" "}
          <Link tw="underline" to="/">
            back to the home page
          </Link>
          ?
          <img tw="mt-4" src="https://picsum.photos/seed/picsum/800/600" alt="" />
        </p>
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
export default NotFound
