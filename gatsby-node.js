const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `resources` });
    createNodeField({
      node,
      name: `slug`,
      value: `/job${slug}`,
    });
  }
};

exports.createPages = async function ({ actions, graphql }) {
  const { data } = await graphql(`
    query PagesQuery {
      allMarkdownRemark {
        nodes {
          fields {
            slug
          }
        }
      }
    }
  `);
  data.allMarkdownRemark.nodes.forEach((node) => {
    actions.createPage({
      path: node.fields.slug,
      component: require.resolve(`${__dirname}/src/templates/JobPosting.js`),
      context: { slug: node.fields.slug },
    });
  });
};
