import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import tw, { styled } from "twin.macro"

const VoteLink = styled.a`
  ${({ hasVoted }) => hasVoted && tw`text-gray-200 `}
  ${({ hasVoted }) =>
    !hasVoted && tw`cursor-pointer text-gray-400 hover:text-gray-600`}
  ${tw`block transition-all ease-in-out duration-300 text-3xl`}
`

export default function Tool({ tool }) {
  const [votes, setVotes] = useState(tool.children[0].sum)
  const [hasVoted, setHasVoted] = useState(false)

  const vote = async direction => {
    try {
      if (hasVoted) {
        return false
      }
      await fetch(`/api/vote${direction}?tag=${tool.children[0].key}`)
      if (direction === "Up") {
        setVotes(votes + 1)
      } else {
        setVotes(votes - 1)
      }
      setHasVoted(true)
    } catch (e) {
      //voting didn't work out
    }
  }

  return (
    <div tw="my-3 flex  border-b border-gray-200 pb-6">
      <p tw="flex-none w-12 text-center text-gray-600">
        <VoteLink hasVoted={hasVoted} onClick={() => vote("Up")}>
          <FaCaretUp tw="m-auto" />
        </VoteLink>
        <span tw="block text-color4 font-bold">{votes}</span>
        <VoteLink hasVoted={hasVoted} onClick={() => vote("Down")}>
          <FaCaretDown tw="m-auto" />
        </VoteLink>
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
