import React from "react"
import tw, { styled } from "twin.macro"
import { Link } from "gatsby"

const NavLink = styled(props => <Link {...props} />)`
  ${tw`transition-all duration-300 hover:bg-gray-400 rounded my-1 mx-1 p-2 sm:px-6`}
`
const Nav = () => {
  return (
    <nav tw="w-full py-4 border-t border-b bg-gray-100">
      <div tw="w-full">
        <div tw="w-full container mx-auto flex flex-row items-center justify-center text-sm font-bold uppercase mt-0">
          <NavLink to="/compare">Compare</NavLink>
          <NavLink to="/tools">Categories</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/sponsor">Sponsor</NavLink>
          <a
            href="https://github.com/analysis-tools-dev/static-analysis/blob/master/CONTRIBUTING.md"
            tw="transition-all duration-300 hover:bg-gray-400 rounded my-1 mx-1 p-2"
          >
            Contribute
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Nav
