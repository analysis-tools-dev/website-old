import React from "react"
import "twin.macro"
import YouTube from "react-youtube"

const getVideo = resources => {
  if (!resources) {
    return
  }
  for (let i = 0; i < resources.length; i++) {
    let item = resources[i]
    if (item.url.includes("youtube.com")) {
      return item
    }
  }
}

// https://stackoverflow.com/a/8260383/270334
const getVideoId = url => {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  let match = url.match(regExp)
  return match && match[7].length === 11 ? match[7] : false
}

const MainMedia = ({ tool }) => {
  let screenshot = tool.fields.screenshot
  let video = getVideo(tool.resources)

  if (video) {
    let id = getVideoId(video.url)
    return <YouTube tw="w-full mb-5" videoId={id} />
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
