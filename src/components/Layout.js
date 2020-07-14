import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fonts } from "@/lib/typography";
import reset from "@/lib/reset";

import "prismjs/themes/prism-okaidia.css";

import { MDXLayoutComponents, MDXGlobalComponents } from "./mdx";

const GlobalStyle = css`
  ${reset};
  html,
  body {
    margin: 0;
    padding: 0;
  }

  input {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 3px;
    font-family: ${fonts.regular};
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
  min-height: 50rem;
`;

const Content = styled.div`
  grid-area: content;
  border-radius: 10px;
  padding: 40px 0px;
  width: 100%;
`;

const Layout = ({ site, frontmatter = {}, children }) => {
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

export default Layout;

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
