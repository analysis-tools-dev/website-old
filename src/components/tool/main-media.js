import React from "react"
import "twin.macro"
import ReactPlayer from "react-player/lazy"
import Carousel from "react-multi-carousel"

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

const renders = {
  video: video => (
    <ReactPlayer tw="max-w-full" url={video.url} width="100%" controls="true" />
  ),
  image: image => (
    <a href={image.url} tw="w-full text-center">
      <img
        alt={`Screenshot of ${image.name} website`}
        tw="border-4 max-w-full inline-block"
        src={image.src}
        height="360"
      />
    </a>
  ),
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

  const carouselProps = {
    responsive: {
      all: {
        breakpoint: { max: 3000, min: 0 },
        items: 1,
      },
    },
    infinite: true,
    showDots: true,
  }

  return (
    <div tw="mb-5">
      {items.length > 1 ? (
        <Carousel {...carouselProps}>
          {items.map(item => (
            <div tw="flex justify-center items-center h-full mb-5 pb-4">
              {renders[item.type](item.source)}
            </div>
          ))}
        </Carousel>
      ) : (
        <div tw="flex justify-center items-center h-full mb-5 pb-4">
          {renders[items[0].type](items[0].source)}
        </div>
      )}
    </div>
  )
}

export default MainMedia
