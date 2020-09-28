const path = require(`path`)
const fs = require(`fs`)
const { slugify } = require("./utils/slugify")
const { getGithubStats } = require("./utils/githubStats")
const { getScreenshot } = require("./utils/screenshot")

// generate pages for slugs
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  const tools = await graphql(`
    {
      allToolsYaml {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `)
  tools.data.allToolsYaml.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/tool.js`),
      context: {
        slug: node.fields.slug,
      },
    })
  })

  const tags = await graphql(`
    {
      allTagsYaml(sort: { fields: name, order: ASC }) {
        nodes {
          name
          tag
          fields {
            slug
          }
        }
      }
    }
  `)
  tags.data.allTagsYaml.nodes.forEach(node => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/tag.js`),
      context: {
        slug: node.fields.slug,
        tag: node.tag,
      },
    })
  })
}

// generate slugs for our data
exports.onCreateNode = async ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/blog/${slugify(node.frontmatter.title)}`,
    })
  }

  if (node.internal.type === `TagsYaml`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/tag/${slugify(node.tag)}`,
    })

    let logoPath = "/logos/fallback.svg"
    if (fs.existsSync(`static/logos/${node.tag}.svg`)) {
      logoPath = `/logos/${node.tag}.svg`
    }
    createNodeField({
      node,
      name: `logo`,
      value: logoPath,
    })
  }

  if (node.internal.type === `ToolsYaml`) {
    createNodeField({
      node,
      name: `slug`,
      value: `/tool/${slugify(node.name)}`,
    })

    const stats = await getGithubStats(node.source)
    if (stats) {
      createNodeField({
        node,
        name: `githubStats`,
        value: stats,
      })
    }

    const screenshot = await getScreenshot(node.homepage)
    if (screenshot) {
      createNodeField({
        node,
        name: `screenshot`,
        value: screenshot,
      })
    }
  }
}
