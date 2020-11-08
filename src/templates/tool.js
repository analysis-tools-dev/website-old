import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Vote from "../components/vote"
import MainMedia from "../components/tool/main-media.js"

import { Helmet } from "react-helmet"
import "twin.macro"
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaCodeBranch,
  FaCopyright,
  FaExclamationCircle,
  FaEye,
  FaHome,
  FaLink,
  FaOsi,
  FaStar,
  FaTags,
} from "react-icons/fa"
import Utterances from "utterances-react"
const { titleCase } = require("../../utils/str")
const { getPopularTagString } = require("../../utils/tag")

const getIntroText = tool => {
  let votes = tool.children[0].sum
  let tags = getPopularTagString(tool.tags, 3)
  let text = `Static analysis tool for ${tags}`
  if (tool.license.toLowerCase() !== "proprietary") {
    text = `Free static analysis tool for ${tags} (${votes} votes)`
  }
  return titleCase(text)
}

const getMetaDescription = tool => {
  let desc = tool.description
  if (tool.fields.githubStats.stargazers_count) {
    desc = `${desc} ${tool.fields.githubStats.stargazers_count} stars on Github.`
  }
  desc = `${desc} [${tool.license}]`
  return desc
}

const getToolsWithSameTags = (tool, others, count) => {
  const tags = tool.tags
  let matches = []
  for (const other of others) {
    if (tool.fields.slug === other.fields.slug) {
      continue
    }
    const matching = tags.filter(t => other.tags.includes(t))
    if (matching.length >= 1) {
      matches.push({
        name: other.name,
        slug: other.fields.slug,
        matching: matching,
      })
    }
  }
  matches.sort((a, b) => (a.matching.length < b.matching.length ? 1 : -1))
  return matches.slice(0, count)
}

export default function Tool(d) {
  const tool = d.data.toolsYaml
  const introText = getIntroText(tool)
  const metaDescription = getMetaDescription(tool)
  const sameTagTools = getToolsWithSameTags(tool, d.data.allToolsYaml.nodes, 5)
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={metaDescription} />
        <title>
          {tool.name}: {introText}
        </title>
      </Helmet>
      <article tw="shadow w-full">
        <div tw="bg-white flex justify-start p-2 md:p-6 w-full">
          <div tw="md:w-12 flex-none">
            <Vote k={tool.children[0].key} sum={tool.children[0].sum} />
          </div>
          <div tw="pl-2">
            <a tw="hover:underline" href={tool.homepage}>
              <h1 tw="text-3xl font-semibold mb-5">{tool.name}</h1>
            </a>
            <p tw="pb-3">{tool.description}</p>
          </div>
        </div>
        <div tw="px-4 md:pl-20 md:pr-6">
          {tool.fields.githubStats.stargazers_count && (
            <div tw="flex">
              <a tw="hover:underline" href={tool.source}>
                Github:
              </a>
              <ul tw="ml-2 mb-2">
                <span tw="mr-3" href={tool.source}>
                  <FaStar tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.stargazers_count}
                </span>
                <span tw="mr-3" href={tool.source}>
                  <FaEye tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.watchers_count}
                </span>
                <span tw="mr-3" href={tool.source}>
                  <FaExclamationCircle tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.open_issues_count}
                </span>
                <span tw="mr-3" href={tool.source}>
                  <FaCodeBranch tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.forks_count}
                </span>
                <span tw="mr-3" href={tool.source}>
                  <FaCalendarAlt tw="mb-1 mr-2 inline-block" />
                  {tool.fields.githubStats.created_at}
                </span>
              </ul>
            </div>
          )}
          <div tw="flex mb-8">
            <span>Workflow integration:</span>
            <ul tw="flex">
              {tool.types.map(t => (
                <li tw="flex" key={t}>
                  <img
                    tw="self-start object-contain ml-2 w-6"
                    src={`/icons/${t}.svg`}
                    alt={`Type: ${t}`}
                  />
                  <div tw="flex-1">{t}</div>
                </li>
              ))}
            </ul>
          </div>
          <MainMedia tool={tool} />
          <p tw="mb-3">
            <FaHome tw="mb-1 mr-2 inline-block" />
            <a tw="underline" href={tool.homepage}>
              Official {tool.name} Homepage
            </a>
          </p>
          {tool.source && (
            <p tw="mb-3">
              <FaLink tw="mb-1 mr-2 inline-block" />
              <a tw="underline" href={tool.source}>
                {tool.source}
              </a>
            </p>
          )}
          {tool.license ? (
            <p tw="mb-3">
              <FaCopyright tw="mb-1 mr-2 inline-block" /> {tool.license}{" "}
            </p>
          ) : (
            <p tw="mb-3">
              <FaOsi tw="mb-1 mr-2 inline-block" />{" "}
              {tool.fields.githubStats.license
                ? tool.fields.githubStats.license.name
                : "Open Source"}
            </p>
          )}
          {tool.deprecated ? (
            <p tw="mb-3">
              <FaExclamationCircle tw="text-red-500 mb-1 mr-2 inline-block" />{" "}
              <span tw="text-red-800">Deprecated/Unmaintained </span>
            </p>
          ) : (
            <p tw="mb-3">
              <FaCheckCircle tw="mb-1 mr-2 inline-block" /> Maintained
            </p>
          )}
          <div>
            <FaTags tw="mb-1 mr-2 inline-block align-top" />
            <ul tw="list-none max-w-sm inline-block align-top">
              {tool.tags.map(tag => (
                <li tw="mb-2 mr-1 inline-block" key={tag}>
                  <a href={"/tag/" + tag}>
                    <span tw="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded">
                      {tag}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {tool.resources && (
            <div tw="mb-4">
              <h3 tw="mt-3 mb-2 font-bold">More Resources</h3>
              <ul tw="list-disc">
                {tool.resources.map(resource => (
                  <li tw="underline ml-4 py-1" key={resource.title}>
                    <a href={resource.url}>{resource.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {sameTagTools.length > 0 && (
            <div tw="mb-4">
              <h3 tw="mt-3 mb-2 text-3xl font-semibold">Alternative Tools</h3>
              <ul tw="list-disc">
                {sameTagTools.map(tool => (
                  <li tw="underline ml-4 py-1" key={tool.slug}>
                    <a href={tool.slug}>{tool.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Utterances
              repo="analysis-tools-dev/website-comments"
              issueTerm="pathname"
              label=""
              theme="github-light"
              crossorigin="anonymous"
              async={false}
              style={`
            & .utterances {
              max-width: 950px;
            }
          `}
            />
          </div>
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    toolsYaml(fields: { slug: { eq: $slug } }) {
      name
      description
      license
      deprecated
      homepage
      source
      tags
      types
      categories
      resources {
        title
        url
      }
      fields {
        slug
        screenshot
        githubStats {
          stargazers_count
          created_at(formatString: "YYYY")
          # archived
          forks_count
          language
          license {
            name
          }
          open_issues_count
          organization {
            avatar_url
          }
          owner {
            avatar_url
          }
          size
          watchers_count
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
    allToolsYaml(filter: { deprecated: { ne: false } }) {
      nodes {
        name
        tags
        fields {
          slug
        }
      }
    }
  }
`
