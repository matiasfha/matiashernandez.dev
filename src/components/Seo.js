import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import SchemaOrg from "./schema-org";
import getShareImage from "@jlengstorf/get-share-image";

const Seo = ({ title, frontmatter, isBlogPost }) => {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          seo {
            canonicalUrl
            title
            author {
              name
            }
          }
          title
          description
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
    seo,
  } = site.siteMetadata;
  const postTitle = frontmatter?.title;
  const postImage = frontmatter?.banner?.childImageSharp.fluid.src;
  const postDescription = frontmatter?.description;

  let metaDescription = description;
  if (postDescription) {
    metaDescription = `${postDescription.substring(0, 157)}...`;
  }

  let metaImage = image;
  if (postImage) {
    metaImage = postImage;
  }
  let realTitle = siteTitle;
  if (title) {
    realTitle = `${title} | ${siteTitle}`;
  }
  const datePublished = isBlogPost ? frontmatter.date : null;

  const ogImage = getShareImage({
    title: title ? title : siteTitle,
    tagline: title
      ? frontmatter.keywords?.map((item) => `#${item}`).join(" ")
      : siteTitle,
    cloudName: "matiasfha",
    imagePublicID: "social-card.jpg",
    textColor: "F9F9F9",
    font: "futura",
    titleExtraConfig: "_line_spacing_-10",
    taglineFontSize: 32,
  });

  return (
    <Helmet
      title={realTitle}
      meta={[
        { name: "description", content: metaDescription },
        { name: "keywords", content: frontmatter.keywords || keywords },
      ]}
    >
      <html lang="es" />
      <title>{realTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta
        name="keywords"
        content={`${keywords.join(",")},${frontmatter.keywords?.join(",")}`}
      />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={realTitle} />
      <meta property="og:description" content={metaDescription} />
      {isBlogPost ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:site_name" content={siteTitle} />
      {/*<meta property="fb:app_id" content={seo.social.fbAppID} />*/}

      {/* Twitter Card tags */}
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={realTitle} />
      <meta name="twitter:site" content={url} />
      <meta name="twitter:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="image" content={ogImage} />
      <meta itemProp="image" content={ogImage} />
      <meta name="twitter:image" content={ogImage} />
      <meta property="og:image" content={ogImage} />

      <SchemaOrg
        isBlogPost={isBlogPost}
        url={url}
        title={title}
        image={`${seo.canonicalUrl}${metaImage}`}
        datePublished={datePublished}
        description={description}
        canonicalUrl={seo.canonicalUrl}
        author={seo.author}
        organization={seo.organization}
        defaultTitle={seo.title}
      />
      <noscript>This site runs best with JavaScript enabled.</noscript>
    </Helmet>
  );
};

export default Seo;
