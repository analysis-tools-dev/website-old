import React from "react"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"

const Videos = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sponsor - Static analysis tools, linters, code quality</title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            Sponsor
          </h1>
          <p tw="mb-3">
            We found that this project is attracting a lot of engineers that
            care about code-quality and solid engineering standards. We think
            this is a great opportunity to advertise solid analysis tools and
            workshops to a professional target audience.
          </p>
          <p tw="mb-3">
            <b>
              That's why we are currently looking for partners who want to
              sponsor hosting and development of the project.
            </b>
          </p>
          <p tw="mb-3">
            We believe that this project should be completely open to avoid bias
            and gatekeepers, which promote tools based on monetary interest and
            not purely on quality. Since we want this to be a community project
            and the code/assets are freely available to everyone, we’ll use
            Github Sponsors + Open Collective for the funding. If you want to
            help us on our mission, take a look at our Github Sponsoring page.
          </p>
          <p tw="mb-3">
            <a
              tw="underline"
              href="https://github.com/sponsors/analysis-tools-dev/"
            >
              Check out our Github Sponsors page here
            </a>
          </p>
        </div>
      </article>
    </Layout>
  )
}

export default Videos
