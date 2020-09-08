import React from "react"
import { Highlight, Snippet } from "react-instantsearch-dom"
import { Link } from "gatsby"
import "twin.macro"

export const ToolsHit = clickHandler => ({ hit }) => (
  <div tw="p-2 border-b">
    <Link to={hit.fields.slug} onClick={clickHandler}>
      <h4>
        <Highlight attribute="name" hit={hit} tagName="mark" />
      </h4>
      {hit.description}
      <Snippet attribute="description" hit={hit} tagName="mark" />
    </Link>
  </div>
)
