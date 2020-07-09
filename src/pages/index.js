import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Markdown from "react-markdown";

import Layout from "components/Layout";
import Link from "components/Link";

const PostTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 22px;
  font-family: Lato Regular, sans-serif;
  :hover {
    color: #3464cc;
  }
`;

const Description = styled.div`
  width: 100%;
  p {
    margin-bottom: 4px;
  }
`;

export default function Index({ data: { site, allMdx } }) {
  return (
    <Layout site={site}>
      <h1>Blog</h1>

      {allMdx.edges.map(({ node: post }) => (
        <div
          key={post.id}
          css={css`
            margin-bottom: 40px;
          `}
        >
          <Link
            to={post.fields.slug}
            aria-label={`View ${post.frontmatter.title}`}
          >
            <PostTitle>{post.frontmatter.title}</PostTitle>
          </Link>
          <Description>
            {post.frontmatter.description ? (
              <Markdown>{post.frontmatter.description}</Markdown>
            ) : null}
            <Link
              to={post.fields.slug}
              aria-label={`View ${post.frontmatter.title}`}
            >
              Read →
            </Link>
          </Description>
        </div>
      ))}
      <Link to="/blog" aria-label="Visit blog page">
        View all articles
      </Link>
    </Layout>
  );
}

export const pageQuery = graphql`
  query {
    site {
      ...site
    }
    allMdx(limit: 5, sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          fields {
            title
            slug
            date
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            banner {
              childImageSharp {
                sizes(maxWidth: 720) {
                  ...GatsbyImageSharpSizes
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
