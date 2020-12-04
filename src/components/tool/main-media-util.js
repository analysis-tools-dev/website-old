import React, { useState, useEffect } from "react"
import tw, { css } from "twin.macro"
import ReactPlayer from "react-player/lazy"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import {
  SliderContentImageStyle, 
  SliderStyle, 
  SliderContentStyle,
  getSliderSetting
} from "./main-media-util-helper"


const renderMainMediaDisplayElement = {
  video: video => {
    return (
      <div tw="h-full text-center" key={video.key} id={video.key} css={video.css}>
        <ReactPlayer url={video.url} width="100%" controls={true}/>
      </div>
    )
  },
  image: image => (
    <a href={image.url} tw="w-full text-center" css={image.css}
    key={image.key} id={image.key}>
      <img
        alt={`Screenshot of ${image.name} website`}
        tw="border-4 max-w-full inline-block"
        src={image.src}
      />
    </a>
  ),
}

const renderMainMediaSliderElement = {
  video: video => sliderThumbnail(video),
  image: image => sliderThumbnail(image)
}

const sliderThumbnail = props => {
  props = props || {}
  const src = props.src || props.thumbnailSrc || "#"
  const alt = props.name || "Thumbnail"
  return (
    <div css={[SliderContentStyle]} 
    id={props.key}
    key={props.key}
    onClick={props.onClick}
    aria-hidden="true">
      <img 
      alt={alt}
      id={props.key + "_img"}
      key={props.key + "_img"}
      src={src}
      css={[
        tw`border-4 max-w-full`,
        SliderContentImageStyle
      ]}
      />
    </div>
  )
}

export const MainMediaUtil = ({data}) => {
  const [items] = useState(data)
  const [index, setIndex] = useState(0)
  const [isRendered, setIsRendered] = useState(false)
  const [hasThumbnails, setHasThumbnails] = useState(false)
  const sliderSetting = getSliderSetting(items.length)

  const toggleDisplayStatusOfElement = options => {
    options = options || {}
    const idForElementToDisplay = "#main_media_util_in_display_" + index
    const elementToDisplay = document.querySelector(idForElementToDisplay)
    elementToDisplay.setAttribute('style', options.style || 'display:block')

    if (isRendered) return
    const idForElementToFocus = "#main_media_util_" + index
    const elementToFocus = document.querySelector(idForElementToFocus)
    elementToFocus.focus({ preventScroll: true })
    setIsRendered(true)
  }

  const populateVideoThumbnails = async () => {
    items.map(async item => {
      if (item.type !== "video") return
      const url = item.thumbnail[item.source.url]
      const target = document.querySelector("#" + item.source.key + "_img")
      target.setAttribute("src", url)
    })
    setHasThumbnails(true)
  }

  useEffect(() => {
    if (items.length > 1) toggleDisplayStatusOfElement()
    if (!hasThumbnails) populateVideoThumbnails()
  })
  
  return items && items.length > 1 ? (
    <>
      <div tw="items-center h-full mb-1">
        {items.map((item, itemIndex) => {
          item.source.key = "main_media_util_in_display_" + itemIndex
          item.source.css = css`display:none;`
          return renderMainMediaDisplayElement[item.type](item.source)
        })}
      </div>
      <div tw="items-center h-full ml-2 mr-2">
        <Slider {...sliderSetting} css={[SliderStyle]}>
          {items.map((item, itemIndex) => {
            item.source.key = "main_media_util_" + itemIndex 
            item.source.onClick = () => { 
              if (itemIndex === index) return
              toggleDisplayStatusOfElement({style : 'display:none' })
              setIndex(itemIndex) 
            }
            return renderMainMediaSliderElement[item.type](item.source)
          })}
        </Slider>
      </div>
    </>
  ) : (
    <div tw="flex justify-center items-center h-full mb-5 pb-4">
      {items && items.map(item => {
        item.source.key = "main_media_util_in_display_0"
        return renderMainMediaDisplayElement[item.type](item.source)
      })}
    </div>
  )
}