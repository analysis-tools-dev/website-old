import React from "react"
import { Highlight } from "react-instantsearch-dom"

const SearchHit = ({ hit }) => {
  return (
    <div>
      <b>
        <Highlight hit={hit} attribute="name" tagName="mark" />
      </b>
      {hit.description && (
        <p>
          <Highlight hit={hit} attribute="description" tagName="mark" />
        </p>
      )}
    </div>
  )
}

export default SearchHit
