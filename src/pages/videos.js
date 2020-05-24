import React from "react"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const Videos = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Videos - Static analysis tools, linters, code quality</title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">Videos</h1>
          <p>Coming soon.</p>
        </div>
      </article>
    </Layout>
  )
}

export default Videos
