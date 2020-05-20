module.exports = {
  siteMetadata: {
    title: `Static Analysis tools`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-yaml`,
    `gatsby-plugin-emotion`,

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
  ],
}
