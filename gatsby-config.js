require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const ToolsQuery = `{
  allToolsYaml {
    edges {
      node {
        objectID: id
        name
        homepage
        source
        tags
        license
        description
        deprecated
        fields {
          slug
        }
      }
    }
  }
}`

const TagsQuery = `{
  allTagsYaml {
    edges {
      node {
        name
        objectID: id
        tag
        type
        fields {
          slug
        }
      }
    }
  }
}`

const queries = [
  {
    query: ToolsQuery,
    indexName: "tools",
    transformer: ({ data }) => data.allToolsYaml.edges.map(({ node }) => node),
  },
  {
    query: TagsQuery,
    indexName: "tags",
    transformer: ({ data }) => data.allTagsYaml.edges.map(({ node }) => node),
  },
]

module.exports = {
  siteMetadata: {
    title: `Analysis Tools`,
    siteUrl: `https://analysis-tools.dev`,
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
    PARALLEL_SOURCING: true,
  },
  plugins: [
    `gatsby-transformer-votes`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `tag-descriptions`,
        path: `${__dirname}/content/tag-descriptions/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `static-analysis-tools`,
        remote: `https://github.com/analysis-tools-dev/static-analysis.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `master`,
        // Tailor which files get imported e.g. import the docs folder from a codebase.
        patterns: `data/tools/*.yml`,
      },
    },
    {
      resolve: `gatsby-source-git`,
      options: {
        name: `static-analysis-tags`,
        remote: `https://github.com/analysis-tools-dev/static-analysis.git`,
        // Optionally supply a branch. If none supplied, you'll get the default branch.
        branch: `master`,
        // Tailor which files get imported e.g. import the docs folder from a codebase.
        patterns: `data/tags.yml`,
      },
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Careful, not to prefix this with GATSBY_, since that way users can change
        // the data in the index.
        apiKey: process.env.ALGOLIA_API_KEY,
        queries,
        chunkSize: 1000,
        settings: {
          // optional, any index settings
        },
      },
    },
    {
      resolve: "@sentry/gatsby",
      options: {
        dsn:
          "https://ee77a43505304f92998feebcb57adac7@o457309.ingest.sentry.io/5453104",
        sampleRate: 0.7,
      },
    },
    "gatsby-plugin-postcss",
  ],
}
