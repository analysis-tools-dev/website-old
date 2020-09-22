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
  console.log(url)
  try {
    if (!url) {
      return
    }

    let screenshotOptions = {
      width: 1024,
      scaleFactor: 0.5,
      quality: 0.8,
      overwrite: true,
      type: "jpeg",
    }
    let outDir = `static/screenshots/websites`
    if (url.includes("github.com")) {
      outDir = `static/screenshots/github`
      screenshotOptions.element = "#readme"
      console.log(screenshotOptions)
    }

    // Remove protocol from url for nicer file names.
    const urlClean = url.replace(/(^\w+:|^)\/\/(www)?/, "")
    const outPath = `${outDir}/${slugify(urlClean)}.jpg`

    if (!fs.existsSync(outPath)) {
      await throttledScreenshot(url, outPath, screenshotOptions)
    }
    // Strip away `static`, as Gatsby puts
    // those files into the server root on build.
    return outPath.replace(/^static/, "")
  } catch (err) {
    console.log(err)
    return
  }
}
