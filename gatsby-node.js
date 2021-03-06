const path = require("path");
const fetch = require("node-fetch");
const {
  createFilePath,
  createRemoteFileNode,
} = require(`gatsby-source-filesystem`);

const PAGINATION_OFFSET = 2;

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/post.js`),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

const createBlog = (createPage, edges) => {
  createPaginatedPages(createPage, edges, "/blog");
};

const createPaginatedPages = (createPage, edges, pathPrefix, context) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET);

    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }

    acc[pageIndex].push(value.node.id);

    return acc;
  }, []);

  pages.forEach((page, index) => {
    const previousPagePath = `${pathPrefix}/${index + 1}`;
    const nextPagePath =
      index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`;

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              title
              slug
            }
            body
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const { edges } = data.allMdx;

    createBlog(actions.createPage, edges);
    createPosts(actions.createPage, edges);
  });

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: {
        $components: path.resolve(__dirname, "src/components"),
      },
    },
  });
};

exports.onCreateNode = async ({
  node,
  getNode,
  actions,
  createNodeId,
  getCache,
}) => {
  const { createNode, createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    const slug = createFilePath({ node, getNode, basePath: `content` }).replace(
      /\//gi,
      ""
    );
    createNodeField({
      name: "id",
      node,
      value: node.id,
    });

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: "description",
      node,
      value: node.frontmatter.description,
    });

    createNodeField({
      name: "slug",
      node,
      value: slug,
    });

    createNodeField({
      name: "date",
      node,
      value: node.frontmatter.date || "",
    });

    if (node.frontmatter.banner) {
      const fileNode = await createRemoteFileNode({
        // the url of the remote image to generate a node for
        url: node.frontmatter.banner,
        parentNodeId: node.id,
        createNode,
        createNodeId,
        getCache,
      });
      if (fileNode) {
        //node.remoteImage___NODE = fileNode.id;
        node.frontmatter.banner___NODE = fileNode.id;
      }
    }
    createNodeField({
      name: "banner",
      node,
      value: node.frontmatter.banner,
    });

    createNodeField({
      name: "keywords",
      node,
      value: node.frontmatter.keywords || [],
    });
  }
};
