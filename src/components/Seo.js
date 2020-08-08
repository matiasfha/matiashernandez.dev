import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import SchemaOrg from "./schema-org";

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
  return (
    <Helmet
      title={realTitle}
      meta={[
        { name: "description", content: metaDescription },
        { name: "keywords", content: frontmatter.keywords || keywords },
      ]}
    >
      <html lang="en" />
      <title>{realTitle}</title>
      <meta name="description" content={metaDescription} />
      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:title" content={realTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${seo.canonicalUrl}${metaImage}`} />
      {isBlogPost ? (
        <meta property="og:type" content="article" />
      ) : (
        <meta property="og:type" content="website" />
      )}
      <meta property="og:site_name" content={siteTitle} />
      {/*<meta property="fb:app_id" content={seo.social.fbAppID} />*/}

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitter} />
      <meta name="twitter:title" content={realTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`${seo.canonicalUrl}${metaImage}`} />
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
