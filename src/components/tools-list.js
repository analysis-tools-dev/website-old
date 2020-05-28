import React from "react"
import { Link, graphql } from "gatsby"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import "twin.macro"

export default function Tool({ tool }) {
  const upVote = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const res = await fetch(`/upVote/${tool.children[0].tag}`)
  }
  const downVote = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    const res = await fetch(`/downVote/${tool.children[0].tag}`)
  }

  return (
    <div tw="my-3 flex  border-b border-gray-200 pb-6">
      <p tw="flex-none w-12 text-center text-gray-600">
        <a tw="block" onClick={upVote.bind(this)}>
          <FaCaretUp tw="m-auto text-3xl text-gray-400" />
        </a>
        <span tw="block text-color4 font-bold">{tool.children[0].sum}</span>
        <a tw="block" onClick={downVote.bind(this)}>
          <FaCaretDown tw="m-auto text-3xl text-gray-400" />
        </a>
      </p>
      <div tw="flex-auto pl-5">
        <Link to={tool.fields.slug} tw="pb-4">
          <h4 tw="font-bold text-xl mb-3">{tool.name}</h4>
        </Link>
        <p tw="text-gray-600">{tool.description}</p>
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!, $tag: String!) {
    tagsYaml(fields: { slug: { eq: $slug } }) {
      name
      tag
      fields {
        slug
      }
    }

    allToolsYaml(
      filter: { tags: { glob: $tag } }
      sort: { fields: childVotes___sum, order: DESC }
    ) {
      nodes {
        id
        name
        description
        tags
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
