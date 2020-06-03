const fetch = require("node-fetch")
const { slugify } = require("../../utils/slugify")
const { v4: uuidv4 } = require("uuid")

/**
 * You can uncomment the following line to verify that
 * your plugin is being loaded in your site.
 *
 * See: https://www.gatsbyjs.org/docs/creating-a-local-plugin/#developing-a-local-plugin-that-is-outside-your-project
 */
exports.onPreInit = () => console.log("Loaded gatsby-starter-plugin")

let data = {}

exports.onPreBootstrap = async () => {
  console.log("Fetching voting data from GCP")
  const resp = await fetch(`https://analysis-tools.dev/api/votesList`)
  data = await resp.json()
  console.log(data)
}

getNodeVotes = async node => {
  const key = slugify(`${node.internal.type}${node.name}`)
  const json = data[key]

  return {
    upVotes: (json && json.upVotes) || 0,
    downVotes: (json && json.downVotes) || 0,
    sum: (json && json.sum) || 0,
    key,
  }
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
