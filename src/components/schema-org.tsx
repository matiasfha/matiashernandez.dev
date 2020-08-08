import React from "react";
import { Helmet } from "react-helmet";

interface Props {
  author: {
    name: string;
  };
  canonicalUrl: string;
  datePublished: string;
  defaultTitle: string;
  description: string;
  image: string;
  isBlogPost: boolean;
  organization: {
    url: string;
    logo: string;
    name: string;
  };
  title: string;
  url: string;
}

export default React.memo(
  ({
    author,
    canonicalUrl,
    datePublished,
    defaultTitle,
    description,
    image,
    isBlogPost,
    organization,
    title,
    url,
  }: Props) => {
    const baseSchema = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url,
        name: title,
        alternateName: defaultTitle,
        sameAs: [
          "https://twitter.com/matiasfha",
          "https://twitter.com/cafe_contech",
          "https://twitter.com/ControlRemoto7",
          "https://instagram.com/matiasfha",
          "https://instagram.com/cafe_contech",
          "https://instagram.com/controlremoto_podcast",
          "https://linkedin.com/in/mhernand",
        ],
      },
    ];

    const schema = isBlogPost
      ? [
          ...baseSchema,
          {
            "@context": "http://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                item: {
                  "@id": url,
                  name: title,
                  image,
                },
              },
            ],
          },
          {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            url,
            name: title,
            alternateName: defaultTitle,
            headline: title,
            image: {
              "@type": "ImageObject",
              url: image,
            },
            description,
            author: {
              "@type": "Person",
              name: author.name,
            },
            publisher: {
              "@type": "Organization",
              url: organization.url,
              logo: organization.logo,
              name: organization.name,
            },
            mainEntityOfPage: {
              "@type": "WebSite",
              "@id": canonicalUrl,
            },
            datePublished,
          },
        ]
      : baseSchema;

    return (
      <Helmet>
        {/* Schema.org tags */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    );
  }
);
