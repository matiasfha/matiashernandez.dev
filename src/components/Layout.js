import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Header from "components/Header";
import Footer from "components/Footer";

import "prismjs/themes/prism-okaidia.css";

import { MDXLayoutComponents, MDXGlobalComponents } from "./mdx";

const GlobalStyle = css`
  html,
  body {
    margin: 0;
    padding: 0;
  }

  ${() => {
    /* Override PrismJS Defaults */ return null;
  }}

  pre {
    background-color: #2f1e2e !important;
    border-radius: 4px;
    font-size: 14px;
  }

  .gatsby-highlight-code-line {
    background-color: #4f424c;
    display: block;
    margin-right: -1em;
    margin-left: -1em;
    padding-right: 1em;
    padding-left: 1em;
  }

  h1 {
    font-family: Phosphate;
    color: #0443ac;
  }
  input {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
    font-family: "Lato Regular";
    border-radius: 4px;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(211, 211, 211);
    border-image: initial;
    padding: 5px 10px;
  }
`;

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "left content right";
  z-index: 5;
`;

const Content = styled.div`
  grid-area: content;
  background: white;
  border-radius: 10px;
  padding: 30px 10px;
`;

export default ({ site, frontmatter = {}, children }) => {
  const {
    title,
    description: siteDescription,
    keywords: siteKeywords,
  } = site.siteMetadata;

  const {
    keywords: frontmatterKeywords,
    description: frontmatterDescription,
  } = frontmatter;

  const keywords = (frontmatterKeywords || siteKeywords).join(", ");
  const description = frontmatterDescription || siteDescription;

  return (
    <Fragment>
      <Helmet
        title={title}
        meta={[
          { name: "description", content: description },
          { name: "keywords", content: keywords },
        ]}
      >
        <html lang="en" />
        <noscript>This site runs best with JavaScript enabled.</noscript>
      </Helmet>

      <Global styles={GlobalStyle} />

      <>
        <Header title={title} />
        <MDXProvider
          components={{
            ...MDXLayoutComponents,
            ...MDXGlobalComponents,
          }}
        >
          <MainContainer>
            <Content>{children}</Content>
          </MainContainer>
          <Footer data={site.siteMetadata} />
        </MDXProvider>
      </>
    </Fragment>
  );
};

export const pageQuery = graphql`
  fragment site on Site {
    siteMetadata {
      title
      description
      author
      keywords
      twitter
      github
      linkedin
      rss
    }
  }
`;
