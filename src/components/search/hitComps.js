import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import "twin.macro"

export const ToolsHit = clickHandler => ({ hit }) => (
  <div tw="px-4 py-4 border-b">
    <Link to={hit.fields.slug} onClick={clickHandler}>
      <h4 tw="pb-1">
        <Highlight attribute="name" hit={hit} tagName="mark" />
      </h4>
      <p tw="text-gray-600">{hit.description}</p>
      {/* Why does this not show anything? */}
      {/* <Snippet attribute="description" hit={hit} tagName="mark" /> */}
    </Link>
  </div>
)
