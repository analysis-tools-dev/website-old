import React, { useState } from "react"
import { FaCaretUp, FaCaretDown } from "react-icons/fa"
import tw, { styled } from "twin.macro"

const VoteLink = styled.a`
  ${({ hasVoted }) => hasVoted && tw`text-gray-200 `}
  ${({ hasVoted }) =>
    !hasVoted && tw`cursor-pointer text-gray-400 hover:text-gray-600`}
  ${tw`block transition-all ease-in-out duration-300 text-3xl`}
`

export default function Vote({ k, sum }) {
  const [votes, setVotes] = useState(sum)
  const [hasVoted, setHasVoted] = useState(false)

  const vote = async direction => {
    try {
      if (hasVoted) {
        return false
      }
      if (direction === "Up") {
        setVotes(votes + 1)
      } else {
        setVotes(votes - 1)
      }
      setHasVoted(true)
      await fetch(`/api/vote${direction}?tag=${k}`)
    } catch (e) {
      //voting didn't work out
    }
  }

  return (
    <div tw="text-center text-gray-600">
      <VoteLink hasVoted={hasVoted} onClick={() => vote("Up")}>
        <FaCaretUp tw="m-auto" />
      </VoteLink>
      <span tw="block font-bold">{votes}</span>
      <VoteLink hasVoted={hasVoted} onClick={() => vote("Down")}>
        <FaCaretDown tw="m-auto" />
      </VoteLink>
    </div>
  )
}
