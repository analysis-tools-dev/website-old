import React, { useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Helmet } from "react-helmet"
import "twin.macro"
import ToolsList from "../components/tools-list"
import SponsorBanner from "../components/sponsorbanner"
import Select from "react-select"

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
      ? tools.length + " great linters and formatters"
      : "Great linter"
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

  const allMaintained = tools.filter(tool => !tool.deprecated)
  const allDeprecated = tools.filter(tool => tool.deprecated)

  const [maintained, setMaintained] = useState(allMaintained)
  const [deprecated, setDeprecated] = useState(allDeprecated)

  const categories = [
    { value: "any", label: "Any" },
    { value: "formatter", label: "Formatter" },
    { value: "linter", label: "Linter" },
  ]

  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  let [categoryFilter, setCategoryFilter] = useState(tool => true)

  const handleCategory = s => {
    setSelectedCategory(s)
    setCategoryFilter(t => t.includes(s.value))
    updateTools()
  }

  const integrations = [
    { value: "any", label: "Any" },
    { value: "cli", label: "Commandline" },
    { value: "service", label: "Web-Service" },
  ]

  const [selectedIntegration, setSelectedIntegration] = useState(
    integrations[0]
  )
  let [integrationFilter, setIntegrationFilter] = useState(tool => true)

  const handleIntegration = s => {
    setSelectedIntegration(s)
    setIntegrationFilter(t => t.includes(s.value))
    updateTools()
  }

  const updateTools = () => {
    let newMaintained = maintained
    console.log(categoryFilter)
    newMaintained = newMaintained.filter(t => categoryFilter(t.categories))
    newMaintained = newMaintained.filter(t => integrationFilter(t.types))
    setMaintained(newMaintained)

    let newDeprecated = deprecated
    newDeprecated = newDeprecated.filter(t => categoryFilter(t))
    newDeprecated = newDeprecated.filter(t => integrationFilter(t))
    setDeprecated(newDeprecated)
  }

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <title>
          {titleText} {tag.name} Static Analysis Tools And Linters
        </title>
      </Helmet>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-2xl font-semibold ">
            {maintained.length + deprecated.length} {tag.name} Static Analysis
            Tools
          </h1>
          <div tw="flex flex-row items-center justify-between my-4 w-full">
            <label tw="inline-block mr-2" htmlFor="tool-type">
              Tool type:
            </label>
            <Select
              id="tool-type"
              tw="inline-block flex-1 flex-grow mr-6"
              value={selectedCategory}
              onChange={handleCategory}
              options={categories}
            />
            <label tw="inline-block mr-2" htmlFor="integration">
              Integration:
            </label>
            <Select
              id="integration"
              tw="inline-block flex-1 flex-grow"
              value={selectedIntegration}
              onChange={handleIntegration}
              options={integrations}
            />
          </div>
        </div>

        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          {maintained.map(tool => (
            <ToolsList tool={tool} key={`${tool.id}-maintained`} />
          ))}
          {deprecated.length > 0 && (
            <h3 tw="text-xl font-semibold pb-5">
              Deprecated/unmaintained tools
            </h3>
          )}
          {deprecated.map(tool => (
            <div tw="opacity-50" key={`${tool.id}-div`}>
              <ToolsList tool={tool} key={`${tool.id}-deprecated`} />
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
        <div tw="px-6 pb-6 text-gray-600">
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
                    tw="inline text-justify text-gray-600"
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
        categories
        deprecated
        description
        tags
        types
        categories
        fields {
          slug
          githubStats {
            stargazers_count
          }
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
