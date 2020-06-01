import { React } from "react"
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
          <p>
            <a tw="underline" href="mailto:hello@analysis-tools.dev">
              Contact us!
            </a>
          </p>
        </div>
      </article>
    </Layout>
  )
}

export default About
