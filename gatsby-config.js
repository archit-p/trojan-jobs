module.exports = {
  siteMetadata: {
    siteUrl: "https://trojanjobs.xyz",
    title: "trojan-jobs",
  },
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-modal-routing-3",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/resources`,
      },
      __key: "pages",
    },
  ],
};
