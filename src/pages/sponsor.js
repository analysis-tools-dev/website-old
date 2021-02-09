import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"
import "twin.macro"
import { Helmet } from "react-helmet"

const Sponsor = ({ data }) => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Sponsor - Static analysis tools, linters, code quality</title>
      </Helmet>
      <article tw="flex flex-col shadow w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">
            <span role="img" aria-label="heart">
              ❤️
            </span>{" "}
            Reach Thousands Of Devs Interested In Code Quality
          </h1>
          <p tw="mb-3">
            This project attracts a lot of engineers that care about
            code-quality and high engineering standards. We think this is an
            excellent opportunity to highlight solid analysis tools and
            workshops to a professional target audience.
          </p>
          <p tw="mb-3">
            <b>
              That's why we are currently looking for partners who want to
              sponsor hosting and development of the project.
            </b>
          </p>
          <p tw="mb-3">
            We believe that this project should be entirely open to avoid bias
            and gatekeepers, which promote tools purely based on monetary
            interest and not on quality. Since we want this to be a community
            project and the code/assets to be freely available to everyone,
            we’ll use Github Sponsors + Open Collective for funding.
          </p>
          <p tw="mb-3">
            If you believe in the same values, don't hestitate to reach out via mail at
            &#104;&#101;&#108;&#108;&#111;&#064;&#097;&#110;&#097;&#108;&#121;&#115;&#105;&#115;&#045;&#116;&#111;&#111;&#108;&#115;&#046;&#100;&#101;&#118;
          </p>
          <p tw="mb-3">
            <Link
              to="https://github.com/sponsors/analysis-tools-dev/"
              tw="w-full bg-blue-800 text-white font-bold text-sm uppercase rounded hover:bg-blue-700 duration-300 transition-all flex items-center justify-center px-2 py-3 mt-4"
            >
              More Info On Github Sponsors
            </Link>
          </p>
        </div>
      </article>
    </Layout>
  )
}

export default Sponsor
