const Bottleneck = require("bottleneck/es5")
const fetch = require("node-fetch")

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100,
})
const throttledFetch = limiter.wrap(fetch)

module.exports.getGithubStats = async url => {
  if (!url) {
    return {}
  }
  if (!url.includes("github.com")) {
    return {}
  }
  const match = url.match(/.*github.com\/(.*)\/(.*).*/)
  if (!match) {
    return {}
  }
  const res = await throttledFetch(
    `https://api.github.com/repos/${match[1]}/${match[2]}`,
    { headers: { accept: "application/vnd.github.preview" } }
  )
  return await res.json()
}
