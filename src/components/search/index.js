import React, { useState } from "react"
import {
  InstantSearch,
  Index,
  Hits,
  connectStateResults,
} from "react-instantsearch-dom"
import "twin.macro"
import algoliasearch from "algoliasearch/lite"
import { HitsWrapper, PoweredBy } from "./styles"
import { SearchBox } from "react-instantsearch-dom"
import * as hitComps from "./hitComps"

// Results informs the user that no matches could be found for a query
// unless the number of hits is positive, i.e. `searchResults.nbHits > 0`.
const Results = connectStateResults(
  ({ searchState: state, searchResults: res, children }) =>
    res && res.nbHits > 0 ? children : `No results for '${state.query}'`
)

export default function Search({ indices, collapse, hitsAsGrid }) {
  const [query, setQuery] = useState(``)
  const [setFocus] = useState(false)
  const searchClient = algoliasearch(
    "V0X7Z4KE9D",
    "544bec33383dc791bcbca3e1ceaec11b"
  )
  return (
    <InstantSearch
      searchClient={searchClient}
      indexName={indices[0].name}
      onSearchStateChange={({ query }) => setQuery(query)}
    >
      <div tw="relative shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-r-none">
        <SearchBox
          tw="w-full px-8"
          translations={{
            placeholder: "Find analysis tools and linters...",
          }}
          submit={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 18 18"
            >
              <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.67"
                transform="translate(1 1)"
              >
                <circle cx="7.11" cy="7.11" r="7.11" />
                <path d="M16 16l-3.87-3.87" />
              </g>
            </svg>
          }
          autoFocus
        />
        <HitsWrapper
          show={query.length > 0}
          asGrid="false"
          tw="max-h-200 overflow-scroll border shadow p-4 bg-white w-full absolute left-0"
        >
          {indices.map(({ name, title, hitComp }) => (
            <Index key={name} indexName={name}>
              <Results>
                <Hits hitComponent={hitComps[hitComp](() => setFocus(false))} />
              </Results>
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      </div>
    </InstantSearch>
  )
}
