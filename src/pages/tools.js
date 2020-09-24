import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import "twin.macro"
import { Helmet } from "react-helmet"
import { Img } from "react-image"

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
        <Img tw="w-10" src={[`/logos/${t.tag}.svg`, "/logos/fallback.svg"]} />
        <strong tw="ml-2">{t.name}</strong>
        <span tw="rounded-full px-2 py-1 ml-2 bg-orange-300 hover:bg-orange-400 text-white rounded-full leading-none inline-block">
          {data.tools.nodes.filter(node => node.tags.includes(t.tag)).length}{" "}
          {data.tools.nodes.filter(node => node.tags.includes(t.tag)).length > 1
            ? "Tools"
            : "Tool"}
        </span>
      </div>
    </Link>
  )
}

const ComponentName = ({ data }) => {
  const metaDescription = getMetaDescription(data)
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
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">
            Tools for Various Programming Languages
          </h1>
          <ul>
            {data.languages.nodes.map(t => (
              <li key={t.id}>
                <Card t={t} data={data} />
              </li>
            ))}
          </ul>
        </div>
      </article>
      <article tw="flex flex-col shadow my-4 w-full">
        <div tw="bg-white flex flex-col justify-start p-6 w-full">
          <h1 tw="text-3xl font-semibold pb-10">
            Tools for Markup Languages and More
          </h1>
          <ul>
            {data.other.nodes.map(t => (
              <li key={t.id}>
                <Card t={t} data={data} />
              </li>
            ))}
          </ul>
        </div>
      </article>
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
export default ComponentName
