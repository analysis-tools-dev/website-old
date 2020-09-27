import React from "react"
import "twin.macro"
import ReactPlayer from "react-player/lazy"

const getVideo = resources => {
  if (!resources) {
    return
  }
  for (let i = 0; i < resources.length; i++) {
    let item = resources[i]
    if (item.url.includes("youtube.com") || item.url.includes("vimeo.com")) {
      return item
    }
  }
}

const MainMedia = ({ tool }) => {
  let screenshot = tool.fields.screenshot
  let video = getVideo(tool.resources)

  if (video) {
    return (
      <ReactPlayer
        tw="max-w-full mb-5"
        url={video.url}
        width="100%"
        controls="true"
      />
    )
  } else {
    return (
      screenshot && (
        <div tw="mb-5">
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
}

export default MainMedia
