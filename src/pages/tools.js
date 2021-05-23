import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"
import { FaFilter } from "react-icons/fa"

const getMetaDescription = data => {
  const langs = data.languages.totalCount
  const other = data.other.totalCount
  const total = langs + other

  const maintained = data.tools.nodes.filter(node => node.deprecated !== true)
  const toolsTotal = maintained.length
  const proprietary = maintained.filter(node =>
    node.license.includes("proprietary")
  ).length
  const free = toolsTotal - proprietary
  const desc = `Linters, formatters, quality checkers for JS, Go, Rust, C, Ruby, Python, PHP and ${
    total - 7
  } more. Compare ${free} free and ${proprietary} commercial tools, which are all actively maintained in ${new Date().getFullYear()}.`
  return desc
}

const Card = ({ t, data }) => {
  return (
    <Link to={t.fields.slug}>
      <div tw="py-5 flex items-center hover:bg-gray-100">
        <img tw="w-10" alt="" src={t.fields.logo} />
        <strong tw="ml-2">{t.name}</strong>
        <span tw="rounded-full px-2 py-1 ml-2 bg-yellow-300 hover:bg-yellow-400 text-white rounded-full leading-none inline-block">
          {data.tools.nodes.filter(node => node.tags.includes(t.tag)).length}{" "}
          {data.tools.nodes.filter(node => node.tags.includes(t.tag)).length > 1
            ? "Tools"
            : "Tool"}
        </span>
      </div>
    </Link>
  )
}

const Tools = ({ data }) => {
  const metaDescription = getMetaDescription(data)
  const [search, setSearch] = useState("")

  const filteredLanguages = data.languages.nodes.filter(lang => {
    return lang.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  const filteredOther = data.other.nodes.filter(other => {
    return other.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
  })

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <title>
          Analysis tools, linters, code quality checkers for{" "}
          {data.languages.nodes.length.toString()} languages
        </title>
      </Helmet>
      <div tw="flex items-center shadow px-4 max-w-full">
        <FaFilter tw="mr-2 inline-block" />
        <span tw="font-bold pr-4 whitespace-nowrap">Quick filter:</span>
        <input
          size="1"
          tw="p-2 my-4 box-border w-full bg-gray-100 border"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {filteredLanguages.length !== 0 && (
        <article tw="flex flex-col shadow my-4 w-full">
          <div tw="bg-white flex flex-col justify-start p-6 w-full">
            <h1 tw="text-3xl font-semibold pb-10">
              Tools for Various Programming Languages
            </h1>
            <ul>
              {filteredLanguages.map(t => (
                <li key={t.id}>
                  <Card t={t} data={data} />
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
      {filteredOther.length !== 0 && (
        <article tw="flex flex-col shadow my-4 w-full">
          <div tw="bg-white flex flex-col justify-start p-6 w-full">
            <h1 tw="text-3xl font-semibold pb-10">
              Tools for Markup Languages and More
            </h1>
            <ul>
              {filteredOther.map(t => (
                <li key={t.id}>
                  <Card t={t} data={data} />
                </li>
              ))}
            </ul>
          </div>
        </article>
      )}
    </Layout>
  )
}

export const query = graphql`
  {
    languages: allTagsYaml(
      filter: { type: { glob: "language" } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        id
        name
        tag
        type
        fields {
          slug
          logo
        }
      }
      totalCount
    }

    other: allTagsYaml(
      filter: { type: { glob: "other" } }
      sort: { fields: name, order: ASC }
    ) {
      nodes {
        id
        name
        tag
        type
        fields {
          slug
          logo
        }
      }
      totalCount
    }

    tools: allToolsYaml {
      nodes {
        deprecated
        license
        tags
        types
        categories
      }
    }
  }
`
export default Tools
