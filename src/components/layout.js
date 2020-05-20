import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"
import "twin.macro"

export default ({ children }) => {
  return (
    <div>
      <div tw="bg-color1 py-2 mb-5">
        <div tw="container w-9/12 mx-auto flex text-right text-white">
          <div tw="flex-auto">
            <Link to={`/about/`}>About</Link>
          </div>
        </div>
        <div tw="container w-9/12 mx-auto flex">
          <div tw="flex-auto">
            <Link to={`/`}>
              <img src="/logo_white.svg" tw="w-4/12" alt="" />
            </Link>
          </div>
          {/* <div tw="flex-auto">
            <input type="text" placeholder="Search..." tw="w-56 p-1" />
          </div> */}
        </div>
      </div>
      <div tw="container w-9/12 mx-auto">
        <div>{children}</div>
      </div>
    </div>
  )
}
