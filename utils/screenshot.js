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
const fs = require("fs") // Or `import fs from "fs";` with ESM

module.exports.getScreenshot = async url => {
  try {
    if (!url) {
      return
    }
    // Skip Github repos as they are mostly boring
    if (url.includes("github.com")) {
      return
    }
    // Remove protocol from url for nicer file names.
    const urlClean = url.replace(/(^\w+:|^)\/\//, "")

    const outPath = `static/screenshots/${slugify(urlClean)}.jpg`
    if (!fs.existsSync(outPath)) {
      await throttledScreenshot(url, outPath, {
        width: 1024,
        scaleFactor: 0.5,
        quality: 0.8,
        overwrite: true,
        type: "jpeg",
      })
    }
    // Strip away `static`, as Gatsby puts
    // those files into the server root on build.
    return outPath.replace(/^static/, "")
  } catch (err) {
    console.log(err)
    return
  }
}
