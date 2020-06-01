import React from "react"
import Layout from "../components/layout"
import "twin.macro"

const About = () => {
  return (
    <Layout>
      <article tw="flex flex-col shadow my-4">
        <div tw="bg-white flex flex-col justify-start p-6">
          <h1 tw="text-xl font-semibold pb-5">About us</h1>
          <blockquote>
            Static program analysis is the analysis of computer software that is
            performed without actually executing programs — Wikipedia CI
          </blockquote>
          <p>
            This is a collection of static analysis tools and code quality
            checkers.
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html:
                "&#60&#97&#32&#104&#114&#101&#102&#61&#34&#109&#97&#105&#108&#116&#111&#58&#104&#101&#108&#108&#111&#64&#97&#110&#97&#108&#121&#115&#105&#115&#45&#116&#111&#111&#108&#115&#46&#100&#101&#118&#34&#62&#67&#111&#110&#116&#97&#99&#116&#32&#117&#115&#60&#47&#97&#62",
            }}
          />
        </div>
      </article>
    </Layout>
  )
}

export default About
