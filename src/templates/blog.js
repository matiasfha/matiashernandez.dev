import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";

import Layout from "@/components/Layout";
import PostsSection from "@/components/PostsSection";

const Blog = ({ data: { allMdx } }) => {
  const content = (
    <>
      <h2>Open Source</h2>
      Este jardin digital o blog es{" "}
      <a href="https://github.com/matiasfha/matiashernandez.dev">
        software libre
      </a>
      , creado con <a href="https://www.gatsbyjs.org">Gatsby</a> y está
      disponible para que puedas revisar, aportar o utilizar como desees.
      <p />
    </>
  );
  return (
    <Layout header={false} title="Blog">
      <PostsSection posts={allMdx.edges} content={content} />
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
