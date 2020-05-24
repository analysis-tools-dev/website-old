require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const TagsQuery = `{
  allTagsYaml {
    edges {
      node {
        name
        objectID: id
        tag
        type
      }
    }
  }
}`

const ToolsQuery = `{
  allToolsYaml {
    edges {
      node {
        objectID: id
        name
        url
        tags
        proprietary
        description
        deprecated
      }
    }
  }
}`

const queries = [
  {
    query: ToolsQuery,
    transformer: ({ data }) => data.allToolsYaml.edges.map(({ node }) => node),
  },
]

module.exports = {
  siteMetadata: {
    title: `Static Analysis tools`,
    siteUrl: `https://analysis-tools.dev`,
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `static-analysis-tools`,
        remote: `https://github.com/jakubsacha/static-analysis.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `patch-1`,
        // Tailor which files get imported eg. import the docs folder from a codebase.
        patterns: `data/tools.yml`,
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `static-analysis-tags`,
        remote: `https://github.com/jakubsacha/static-analysis.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `patch-1`,
        // Tailor which files get imported eg. import the docs folder from a codebase.
        patterns: `data/tags.yml`,
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Careful, no not prefix this with GATSBY_, since that way users can change
        // the data in the index.
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          // optional, any index settings
        },
        enablePartialUpdates: true, // default: false
        matchFields: ["slug", "modified"], // Array<String> default: ['modified']
      },
    },
  ],
}
