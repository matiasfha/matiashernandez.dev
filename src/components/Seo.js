import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          title
          description
          author
          keywords
          twitter
          siteUrl
          image
        }
      }
    }
  `);
  const {
    title: siteTitle,
    description,
    keywords,
    twitter,
    siteUrl: url,
    image,
  } = site.siteMetadata;

  return (
    <Helmet
      title={title || siteTitle}
      meta={[
        { name: "description", content: description },
        { name: "keywords", content: keywords },
      ]}
    >
      <html lang="en" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      {/*<meta property="fb:app_id" content={seo.social.fbAppID} />*/}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <noscript>This site runs best with JavaScript enabled.</noscript>
    </Helmet>
  );
};

export default Seo;
