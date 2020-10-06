import React from "react"
import "twin.macro"
import { MainMediaUtil } from "./main-media-util"

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
  const { name, homepage, resources } = tool
  let screenshot = { name, url: homepage, src: tool.fields.screenshot }
  let video = getVideo(resources)
  const items = []

  if (screenshot) {
    items.push({ type: "image", source: screenshot })
  }

  if (video) {
    items.push({ type: "video", source: video })
  }

  return (
    <div tw="mb-5">
      <MainMediaUtil data={items} />
    </div>
  )
}

export default MainMedia
