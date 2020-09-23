import React from "react"
import "twin.macro"

const MainMedia = ({ tool }) => {
  let screenshot = tool.fields.screenshot
  let resources = tool.fields.resources
  return (
    screenshot && (
      <div tw="mb-3">
        <a href={tool.homepage}>
          <img
            alt={`Screenshot of ${tool.name} website`}
            tw="border-4 max-w-full"
            src={screenshot}
          />
        </a>
      </div>
    )
  )
}

export default MainMedia
