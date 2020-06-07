const Bottleneck = require("bottleneck/es5")
const fetch = require("node-fetch")

const limiter = new Bottleneck({
  maxConcurrent: 10,
  minTime: 100,
})
const throttledFetch = limiter.wrap(fetch)

module.exports.getGithubStats = async url => {
  try {
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

    let headers = { accept: "application/vnd.github.preview" }
    if (process.env.GITHUB_USERNAME && process.env.GITHUB_TOKEN) {
      headers.Authorization =
        "Basic " +
        Buffer.from(
          process.env.GITHUB_USERNAME + ":" + process.env.GITHUB_TOKEN
        ).toString("base64")
    }
    const res = await throttledFetch(
      `https://api.github.com/repos/${match[1]}/${match[2]}`,
      { headers }
    )
    return await res.json()
  } catch (err) {
    console.log(err)
    return {}
  }
}
