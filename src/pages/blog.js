import React from "react"
import Layout from "../components/layout"
import "twin.macro"

const Blog = () => {
  return (
    <Layout>
      <article tw="flex flex-col shadow my-4">
        <div tw="bg-white flex flex-col justify-start p-6">
          <h1 tw="text-xl font-semibold pb-5">Our Mission</h1>
          <p>
            We found that the static code analysis is a topic that is attracting
            a lot of engineers, which care about code-quality and solid
            engineering standards. Our goal is to create an open community for
            developers that want to take their code and skill set to the next
            level.
          </p>
          <p>
            We want this to be a community project. All code is on Github and we
            foster collaboration. If you're willing to help,{" "}
            <a href="https://github.com/analysis-tools-dev/">
              head over to our Github organization
            </a>
            , where we organize our work.
          </p>
          <p>
            If you like to sponsor the project, please get in touch with us!
          </p>
        </div>
      </article>
    </Layout>
  )
}

export default Blog
