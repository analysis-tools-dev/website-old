import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"
import ToolsList from "../components/tools-list"
import SponsorBanner from "../components/sponsorbanner"

const getTitleText = tools => {
  if (tools.length < 3) {
    return "The best"
  } else {
    return `Best ${tools.length}`
  }
}

const numToWord = num => {
  switch (num) {
    case 1:
      return "one"
    case 2:
      return "two"
    case 3:
      return "three"
    case 4:
      return "four"
    case 5:
      return "five"
    default:
      return num
  }
}

const getMetaDescription = (tag, tools) => {
  const numExampleTools = 3
  const topTools = tools.slice(0, numExampleTools).map(t => t.name)
  const free = tools.filter(tool => !tool.license.includes("proprietary"))
    .length

  let desc = `${
    tools.length > 1
      ? tools.length + " great linters and formatters "
      : "Great linter "
  } for ${tag.name}`

  if (tools.length > numExampleTools) {
    desc += ` like `
  } else {
    desc += `: `
  }
  desc += `${topTools.join(", ")}`
  if (free > 1) {
    desc += ` including ${numToWord(free)} free ${
      free === 1 ? "tool" : "tools"
    }`
  }
  desc += `. Improve your code quality with tools rated by fellow developers.`
  return desc
}

const Tag = d => {
  const tag = d.data.tagsYaml
  const tools = d.data.allToolsYaml.nodes
  const titleText = getTitleText(tools)
  const metaDescription = getMetaDescription(tag, tools)

  const maintained = tools.filter(tool => !tool.deprecated)
  const deprecated = tools.filter(tool => tool.deprecated)

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <title>
          {titleText} {tag.name} static analysis tools and linters
        </title>
      </Helmet>
      <article tw="flex flex-col shadow w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold ">
            {titleText} {tag.name} static analysis tools
          </h1>
          {d.data.markdownRemark && (
            <div tw="pt-6 w-full">
              <h3 tw="text-xl font-semibold pb-5">What is {tag.name}?</h3>
              <div tw="flex w-full">
                <img
                  style={{ width: 64 + "px", height: 64 + "px" }}
                  alt=""
                  src={tag.fields.logo}
                />
                <div tw="pl-5">
                  <p
                    tw="inline text-justify"
                    dangerouslySetInnerHTML={{
                      __html: d.data.markdownRemark.excerpt,
                    }}
                  />
                  <a
                    tw="underline text-gray-600"
                    href={d.data.markdownRemark.frontmatter.source}
                  >
                    (More info)
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          {/* Only show header when we have the SEO text block above it */}
          {d.data.markdownRemark && (
            <h3 tw="text-xl font-semibold pb-5">
              What are the best {tag.name} analysis tools?
            </h3>
          )}
          {maintained.map(tool => (
            <ToolsList tool={tool} key={tool.id} />
          ))}
          {deprecated.length > 0 && (
            <h3 tw="text-xl font-semibold pb-5">
              Deprecated/unmaintained tools
            </h3>
          )}
          {deprecated.map(tool => (
            <div tw="opacity-50" key={`${tool.id}-div`}>
              <ToolsList tool={tool} key={tool.id} />
            </div>
          ))}
          <SponsorBanner />
        </div>
        <p tw="px-6 pb-6 text-gray-600">
          Missing an entry? Please{" "}
          <a
            tw="underline"
            href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
          >
            let us know.
          </a>
        </p>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $tag: String!) {
    tagsYaml(fields: { slug: { eq: $slug } }) {
      name
      tag
      fields {
        slug
        logo
      }
    }

    markdownRemark(frontmatter: { tag: { eq: $tag } }) {
      excerpt(format: HTML, pruneLength: 500)
      frontmatter {
        tag
        source
      }
    }

    allToolsYaml(
      filter: { tags: { glob: $tag } }
      sort: { fields: childVotes___sum, order: DESC }
    ) {
      nodes {
        id
        name
        license
        deprecated
        description
        tags
        types
        categories
        fields {
          slug
        }
        children {
          ... on Votes {
            sum
            downVotes
            upVotes
            key
          }
        }
      }
    }
  }
`

export default Tag
