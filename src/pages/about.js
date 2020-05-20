import React from "react"
import Layout from "../components/layout"

const About = () => {
  return (
    <Layout>
      <div>
        <h1>About</h1>
        <blockquote>
          Static program analysis is the analysis of computer software that is
          performed without actually executing programs — Wikipedia CI
        </blockquote>
        <p>
          This is a collection of static analysis tools and code quality
          checkers.
        </p>
      </div>
    </Layout>
  )
}

export default About
