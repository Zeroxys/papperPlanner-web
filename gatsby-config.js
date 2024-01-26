/**
 * @type {import('gatsby').GatsbyConfig}
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `papperPlannerWeb`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    // {
    //   resolve: `gatsby-plugin-react-redux-persist`,
    //   options: {
    //     pathToCreateStoreModule: "./src/redux/store",
    //     serialize: {
    //       space: 0,
    //       isJSON: true,
    //       unsafe: false,
    //       ignoreFunction: true,
    //     },
    //     cleanupOnClient: true,
    //     windowKey: "__PRELOADED_STATE__",
    //   },
    // },
    // {
    //   resolve: `gatsby-plugin-react-redux`,
    //   options: {
    //     pathToCreateStoreModule: "./src/redux/store",
    //     serialize: {
    //       space: 0,
    //       isJSON: true,
    //       unsafe: false,
    //       ignoreFunction: true,
    //     },
    //     cleanupOnClient: true,
    //     windowKey: "__PRELOADED_STATE__",
    //   },
    // },
    "gatsby-plugin-emotion",
    {
      resolve: `gatsby-omni-font-loader`,
      options: {
        enableListener: true,
        preconnect: [
          `https://fonts.googleapis.com`,
          `https://fonts.gstatic.com`,
        ],
        web: [
          {
            name: `Open Sans`,
            file: `https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap`,
          },
        ],
      },
    },
  ],
};
