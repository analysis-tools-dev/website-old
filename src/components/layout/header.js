import React from "react"
import Search from "../search"
import { Link } from "gatsby"

const searchIndices = [
  { name: `tags`, title: `Tags`, hitComp: `ToolsHit` },
  { name: `tools`, title: `Tools`, hitComp: `ToolsHit` },
]

const Header = () => {
  return (
    <header tw="w-full flex-row container mx-auto">
      <div tw="md:flex items-center">
        <Link to="/" tw="w-2/6 h-1 md:h-auto">
          <img
            width="328px"
            height="91px"
            src="/logo.svg"
            tw="w-4/6 mx-auto md:w-full"
            alt="Analysis tools logo"
          />
        </Link>

        <div tw="mx-5 mb-5 md:mb-0 md:w-4/6 relative">
          <Search tw="w-full relative" collapse indices={searchIndices} />
        </div>
      </div>
    </header>
  )
}

export default Header
