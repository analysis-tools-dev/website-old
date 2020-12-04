/*
 * Take a screenshot from a website
 * Alternatives considered:
 * - https://www.screenshotapi.io/ - Simple API, not free but cheap. Maybe alternative for the future.
 * - https://github.com/brenden/node-webshot - Very popular, but seems to have a lot of issues.
 */
const captureWebsite = require("capture-website")
const Bottleneck = require("bottleneck/es5")
const limiter = new Bottleneck({
  maxConcurrent: 4,
  minTime: 500,
})
const throttledScreenshot = limiter.wrap(captureWebsite.file)
const { slugify } = require("./slugify")
const fs = require("fs")

module.exports.getScreenshot = async url => {
  let screenshotOptions = {
    width: 1024,
    scaleFactor: 0.5,
    quality: 0.9,
    overwrite: false,
    type: "jpeg",
  }

  let outDir = `static/screenshots/websites`
  if (url.includes("github.com")) {
    outDir = `static/screenshots/github`
    screenshotOptions.waitForElement = "#readme"
    screenshotOptions.scrollToElement = "#readme"
  }

  // Remove protocol from url for nicer file names.
  const urlClean = url.replace(/(^\w+:|^)\/\/(www)?/, "")
  const outPath = `${outDir}/${slugify(urlClean)}.jpg`
  // Strip away `static`, as Gatsby puts
  // those files into the server root on build.
  const outURL = outPath.replace(/^static/, "")

  if (fs.existsSync(outPath)) {
    return outURL
  }

  console.log(`Fetching screenshot for ${url}`)
  try {
    fs.mkdirSync(outDir, { recursive: true })
    await throttledScreenshot(url, outPath, screenshotOptions)
    return outURL
  } catch (err) {
    console.log(err)
    return
  }
}
