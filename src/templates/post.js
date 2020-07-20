import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import MDXRenderer from "gatsby-plugin-mdx/mdx-renderer";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Markdown from "react-markdown";

import { bpMaxSM } from "@/lib/breakpoints";
import SharePost from "@/components/SharePost";
import { fonts } from "@/lib/typography";
import Layout from "@/components/Layout";
import Seo from "@/components/Seo";
import photo from "../../assets/photo.png";

const PostTitle = styled.h1`
  color: #333;
  justify-self: center;
  width: 80%;
  margin-bottom: 2rem;
  font-family: ${fonts.regular};
  text-align: center;
  ${bpMaxSM} {
    font-size: 30px;
  }
`;

const Article = styled.article`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr;
  a {
    text-decoration: none;
  }
  ${bpMaxSM} {
    .gatsby-highlight {
      font-size: 12px;
      max-width: 90vw;
    }
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 0rem 0rem 1rem;
  display: grid;
  grid-template-columns: 150px 1fr;
  ${bpMaxSM} {
    grid-template-columns: 100px 1fr;
  }
`;
export default function Post({ data: { mdx }, pageContext: { next, prev } }) {
  const { slug, date, title, banner, bannerCredit } = mdx.frontmatter;
  return (
    <>
      <Seo frontmatter={mdx.frontmatter} />
      <Layout
        frontmatter={mdx.frontmatter}
        header={false}
        title={title}
        background={false}
      >
        <Article>
          <PostTitle>{title}</PostTitle>

          {banner && (
            <div
              css={css`
                text-align: center;
                padding: 0 0 2rem;
                p {
                  margin-bottom: 0;
                }
              `}
            >
              <Img
                css={css`
                  max-height: 300px;
                `}
                fluid={banner.childImageSharp.fluid}
                alt={title}
              />
              {bannerCredit ? <Markdown>{bannerCredit}</Markdown> : null}
            </div>
          )}

          <MDXRenderer>{mdx.body}</MDXRenderer>
        </Article>
        <time
          css={{
            textAlign: "right",
            display: "block",
            fontSize: "12px",
            marginBottom: "10px",
          }}
          title="Last Updated Date"
        >
          {date}
        </time>
        <SharePost url={`https://matiashernandez.dev/${slug}`} title={title} />
        <Footer>
          <img
            src={photo}
            alt="Matias Hernandez A."
            css={css`
              border-radius: 50%;
              max-width: 80px;
            `}
          />
          <p>
            <strong>Matias Hernandez A.</strong>
            {` Ingeniero de Software Chileno. Ha escrito cientos de lineas de código para diversas compañias y clientes en EE.UU y Europa construyendo diversos productos.
              `}
          </p>
        </Footer>
      </Layout>
    </>
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
            fluid(maxHeight: 300) {
              ...GatsbyImageSharpFluid
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
