const path = require("path");
require("dotenv").config({
  path: `.env`,
});

const BUZZSPROUT_TOKEN = process.env.BUZZSPROUT_TOKEN;

const eggheadTransformer = require("./embedder-transformers/egghead");
const codesandboxTransformer = require("./embedder-transformers/codesandbox");
const buzzsproutTransformer = require("./embedder-transformers/buzzsprout");

module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    siteUrl: "https://www.matiashernandez.dev/",
    author: "Matias Hernandez",
    title: "Digital Garden de Matias Hernandez",
    ogSiteName: "Matias Hernandez A.", // Facebook Site Name
    ogLanguage: "es_CL",
    // Social component
    twitter: "https://twitter.com/matiasfha/",
    twitterHandle: "@matiasfha",
    github: "https://github.com/matiasfha/",
    linkedin: "https://www.linkedin.com/in/mhernand/",
    image: "assets/photo.png",
    description:
      "Hola! Soy Matias Hernandez. Ingeniero de Producto/Software, Podcaster e Instructor.",
    keywords: [
      "Software Engineer",
      "Product Engineer",
      "Web Developer",
      "Consultant",
      "Freelancer",
    ],
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/content/posts`,
        name: "blog",
      },
    },
    {
      resolve: `gatsby-source-buzzsprout-api`,
      options: {
        name: "ControlRemoto",
        token: BUZZSPROUT_TOKEN,
        podcastId: "1057351",
      },
    },
    {
      resolve: `gatsby-source-buzzsprout-api`,
      options: {
        name: "CafeConTech",
        token: BUZZSPROUT_TOKEN,
        podcastId: "1081172",
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        defaultLayouts: {
          default: path.join(__dirname, "./src/templates/page.js"),
        },
        extensions: [".mdx", ".md"],
        gatsbyRemarkPlugins: [
          {
            resolve: "gatsby-remark-images",
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
            },
          },
          {
            resolve: `gatsby-remark-embedder`,
            options: {
              customTransformers: [
                eggheadTransformer,
                codesandboxTransformer,
                buzzsproutTransformer,
              ],
            },
          },
        ],
      },
    },
    "@pauliescanlon/gatsby-mdx-embed",
    "gatsby-remark-reading-time",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "A learning, teaching and writing software engineer",
        short_name: "MHA",
        start_url: "/",
        background_color: "#fff",
        theme_color: "#525dce",
        display: "standalone",
        icon: "assets/logo.png",
      },
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@": path.join(__dirname, "src"),
        assets: path.join(__dirname, "assets"),
      },
    },
    "gatsby-plugin-workerize-loader",
    "gatsby-plugin-twitter",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-emotion",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-react-helmet",
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/lib/typography`,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
        head: false,
        defer: true,
      },
    },
    {
      resolve: "gatsby-plugin-social-cards",
      options: {
        // ommit to skip
        authorImage: "./assets/photo.png",
        // image to use when no cover in frontmatter
        // author to use when no auth in frontmatter
        defaultAuthor: "Matías Hernández A.",
        // card design
        design: "default", // 'default' or 'card'
      },
    },
  ],
};
