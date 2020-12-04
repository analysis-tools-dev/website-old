// code copied from screenshot.js with additional changes
// for downloading thumbnail images

const download = require('image-downloader')
const Bottleneck = require("bottleneck/es5")
const limiter = new Bottleneck({
  maxConcurrent: 4,
  minTime: 500,
})
const throttledThumbnailDownload = limiter.wrap(download.image)
const { slugify } = require("./slugify")
const fs = require("fs")
const fetch = require('node-fetch');
const throttledFetch = limiter.wrap(fetch)
/**
 * 
 * **Credits**  
 *    Author : yangshun
 *    Gist link : https://gist.github.com/yangshun/9892961
 */
const parseVideo = url => {
  if (!url) {
    return
  }

  url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(&\S+)?/);

  const type = RegExp.$3.indexOf("youtu") > -1 ? "youtube" :
              RegExp.$3.indexOf("vimeo") > -1 ? "vimeo" 
              : undefined

  return {
    type: type,
    id: RegExp.$6
  }
}

const getThumbnailUrl = async videoUrl => {
  if (!videoUrl) {
    return
  }

  console.log(`Getting thumbnail link for video URL : ${videoUrl}`)
  const video = parseVideo(videoUrl)
  if (video.type === "youtube")
    return video.id ? "https://img.youtube.com/vi/" + video.id + "/maxresdefault.jpg" : undefined
  if (video.type === "vimeo") {
    const fetched = (async videoId => {
      let result = {}
      try {
        const response = await throttledFetch("https://vimeo.com/api/v2/video/" + videoId + ".json")
        result = await response.json()
        return result[0].thumbnail_large
      } catch (e) {
        console.error("Error while fetching Vimeo video data", e)
        return
      }
    })
    return fetched(video.id)
  }
}

const handleResource = async urlArg => {
  if(!urlArg) {
    return
  }
  
  console.log(`Fetching thumbnail for ${urlArg}`)
  try {
    
    let thumbnailUrl = await getThumbnailUrl(urlArg)
    if (!thumbnailUrl) {
      return
    }

    const outDir = `static/thumbnails`
    

    fs.mkdirSync(outDir, { recursive: true })

    const urlClean = thumbnailUrl.replace(/(^\w+:|^)\/\/(www)?/, "")
    const outPath = `${outDir}/${slugify(urlClean)}.jpg`

    let thumbnailDownloadOptions = {
      url: thumbnailUrl,
      dest: outPath,
      extractFilename: false
    }

    if (!fs.existsSync(outPath)) {
      await throttledThumbnailDownload(thumbnailDownloadOptions)
    }

    console.log(`Downloaded and saved thumbnail image at ${outPath}`)
    return outPath.replace(/^static/, "")
  } catch (err) {
    console.log(err)
    return
  }
}

module.exports.getThumbnailString = async resources => {
  if(!resources) {
    return
  }

  let resource = {};
  for (let i = 0; i < resources.length; i++) {
    if(!resources[i])
      continue
    let item = resources[i]
    if (item.url.includes("youtube.com") || item.url.includes("vimeo.com")) {
      let thumbnailLink = undefined
      try {
        const outPath = await handleResource(item.url)
        if(outPath) {
          thumbnailLink = outPath.replace(/^static/, "")
        }
      } catch (err) {
        console.log(err)
      }
      
      if(!thumbnailLink) {
        thumbnailLink = await getThumbnailUrl(item.url)
      }
      resource[item.url] = thumbnailLink
      
    }
  }

  return JSON.stringify(resource).replace('"','\"')
}
