import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import Layout from "@/components/Layout";
import PostsSection from "@/components/PostsSection";

const Blog = ({ data: { allMdx } }) => {
  return (
    <Layout header={false} title="Blog">
      <PostsSection posts={allMdx.edges} />
    </Layout>
  );
};

export default Blog;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { fileAbsolutePath: { regex: "//content/posts//" } }
    ) {
      edges {
        node {
          id
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            title
            description
            banner {
              childImageSharp {
                fluid(maxWidth: 350) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            keywords
          }
        }
      }
    }
  }
`;
