import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ title, frontmatter }) => {
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
  const postTitle = frontmatter.title;
  const postImage = frontmatter.banner.childImageSharp.fluid.src;
  const postDescription = frontmatter.description;

  let metaTitle = siteTitle;
  if (postTitle) {
    metaTitle = postTitle;
  }
  let metaDescription = description;
  if (postDescription) {
    metaDescription = `${postDescription.substring(0, 157)}...`;
  }

  let metaImage = image;
  if (postImage) {
    metaImage = postImage;
  }
  return (
    <Helmet
      title={metaTitle}
      meta={[
        { name: "description", content: metaDescription },
        { name: "keywords", content: frontmatter.keywords || keywords },
      ]}
    >
      <html lang="en" />
      <title>
        {siteTitle} | {metaTitle}
      </title>
      <meta name="description" content={metaDescription} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={`${siteTitle} | ${metaTitle}`} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      {/*<meta property="fb:app_id" content={seo.social.fbAppID} />*/}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={`${siteTitle} | ${metaTitle}`} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <noscript>This site runs best with JavaScript enabled.</noscript>
    </Helmet>
  );
};

export default Seo;
