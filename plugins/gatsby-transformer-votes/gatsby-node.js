const fetch = require("node-fetch")
const Bottleneck = require("bottleneck/es5")
const { slugify } = require("../../utils/slugify")
const { v4: uuidv4 } = require("uuid")

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

const limiter = new Bottleneck({
  minTime: 30,
  maxConcurrent: 10,
})

getNodeVotes = async node => {
  const key = slugify(`${node.internal.type}${node.name}`)
  const wrapped = limiter.wrap(fetch)
  const resp = await wrapped(`https://analysis-tools.dev/getVotes/${key}`)
  const json = await resp.json()
  return { ...json, key }
}

// generate slugs for our data
exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
}) => {
  if (node.internal.type !== `ToolsYaml`) {
    return
  }
  const { createParentChildLink, createNode } = actions

  const votes = await getNodeVotes(node)

  const votesNode = {
    id: createNodeId(uuidv4()),
    parent: node.id,
    ...votes,
    internal: {
      type: `Votes`,
      contentDigest: createContentDigest(votes),
    },
  }
  await createNode(votesNode)
  createParentChildLink({ parent: node, child: votesNode })
}
