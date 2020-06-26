// Loaded by /gatsby-config.js

// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

export const siteMetadata = {
  title: `Architus Docs`,
  description: `Architus docs re-write.`,
  author: `architus`,
};

export const plugins = [
  {
    resolve: `gatsby-plugin-alias-imports`,
    options: {
      alias: {
        "@lib": path.resolve(__dirname, "../lib/src"),
        "@docs": path.resolve(__dirname, "../docs/src"),
        "@design": path.resolve(__dirname, "../design/src"),
      },
      extensions: [],
    },
  },
  {
    resolve: "gatsby-plugin-react-svg",
    options: {
      rule: {
        include: /\.inline\.svg$/,
      },
    },
  },
  "gatsby-plugin-typescript",
  "gatsby-plugin-linaria",
  `gatsby-plugin-react-helmet`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `content`,
      path: `${__dirname}/content`,
    },
  },
  ...(process.env.GITHUB_TOKEN == null
    ? []
    : [
        {
          resolve: "gatsby-source-graphql",
          options: {
            typeName: "GitHub",
            fieldName: "github",
            url: "https://api.github.com/graphql",
            headers: {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            },
            fetchOptions: {},
          },
        },
      ]),
  {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.md`],
      gatsbyRemarkPlugins: [],
      plugins: [],
    },
  },
];
