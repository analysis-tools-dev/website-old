import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"

const NotFound = () => {
  return (
    <Layout>
      <article tw="shadow w-full p-8">
        <h1 tw="text-3xl font-semibold mb-5">Page not found</h1>
        <p>
          The page you are looking for does not exist.
          <br />
          How about going{" "}
          <Link tw="underline" to="/">
            back to the home page
          </Link>
          ?
          <a href="http://oppressive-silence.com/comic/oh-no-the-robots">
            <img tw="mt-4" src="/404.jpg" alt="Comic by Ethan Vincent" />
          </a>
            Source: Ethan Vincent of <a href="http://oppressive-silence.com">oppressive-silence.com</a>
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
