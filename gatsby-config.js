module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "trojan-jobs",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
