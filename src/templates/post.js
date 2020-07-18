import React, { Fragment } from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";

import Layout from "../components/Layout";
import Link from "../components/Link";

export default function Post({ data: { mdx }, pageContext: { next, prev } }) {
  return (
    <Layout frontmatter={mdx.frontmatter}>
      <h1>{mdx.frontmatter.title}</h1>
      <h2>{mdx.frontmatter.date}</h2>

      {mdx.frontmatter.banner && (
        <Img sizes={mdx.frontmatter.banner.childImageSharp.sizes} alt="" />
      )}

      <MDXRenderer>{mdx.body}</MDXRenderer>

      <div>
        <hr />

        {prev && (
          <span>
            Previous <Link to={prev.fields.slug}>{prev.fields.title}</Link>
          </span>
        )}
        {next && (
          <span>
            Next <Link to={next.fields.slug}>{next.fields.title}</Link>
          </span>
        )}
      </div>
    </Layout>
  );
}

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        banner {
          childImageSharp {
            sizes(maxWidth: 900) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        slug
        keywords
      }
      body
    }
  }
`;
