import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import styled from "@emotion/styled";
import Markdown from "react-markdown";
import { fonts } from "lib/typography";

import Layout from "components/Layout";
import Link from "components/Link";

const PostTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 22px;
  font-family: ${fonts.bold};
  color: #0443ac;
  :hover {
    color: #3464cc;
  }
  text-decoration: none;
`;

const Description = styled.div`
  width: 100%;
  font-family: ${fonts.regular};
  font-size: 18px;
  p {
    margin-bottom: 4px;
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
`;

const PostCard = styled(Link)`
  width: 70%;
  background: white;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px 0px;
  border-radius: 5px;
  padding: 30px 30px 60px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const PodcastsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  padding-bottom: 2rem;
`;

const PodcastColumn = styled.div`
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px 0px;
  border-radius: 5px;
  padding: 1rem;
  h2 {
    color: #0443ac;
    font-family: ${fonts.titles};
  }
  h4 {
    color: #3464cc;
    font-family: ${fonts.bold};
  }
`;

const PodcastEpisode = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  h4 {
    flex: 0.8;
  }
`;

const PodcastImg = styled(Img)`
  border-radius: 60px;
  width: 100%;
`;

const Podcast = ({ episodes, title }) => (
  <PodcastColumn>
    <h2>{title}</h2>
    {episodes.map((item) => (
      <PodcastEpisode
        key={item.id}
        to={`podcast/${item.podcastName}/${item.slug}}`}
      >
        <h4>{item.title}</h4>
        <PodcastImg fluid={item.remoteImage.childImageSharp.fluid} />
      </PodcastEpisode>
    ))}
  </PodcastColumn>
);
export default function Index({
  data: {
    site,
    allMdx,
    allPodcastEpisodeCafeConTech,
    allPodcastEpisodeControlRemoto,
  },
}) {
  return (
    <Layout site={site}>
      <h1>Podcasts</h1>
      <PodcastsContainer>
        <Podcast
          episodes={allPodcastEpisodeCafeConTech.nodes}
          title="Cafe con Tech"
        />
        <Podcast
          episodes={allPodcastEpisodeControlRemoto.nodes}
          title="Control Remoto"
        />
      </PodcastsContainer>
      <h1>Blog</h1>
      <PostsContainer>
        {allMdx.edges.map(({ node: post }) => (
          <PostCard
            key={post.id}
            to={post.fields.slug}
            aria-label={`View ${post.frontmatter.title}`}
          >
            <PostTitle>{post.frontmatter.title}</PostTitle>
            <Img
              fluid={post.frontmatter.banner.childImageSharp.fluid}
              alt={post.frontmatter.title}
            />
            <Description>
              {post.frontmatter.description ? (
                <Markdown>{post.frontmatter.description}</Markdown>
              ) : null}
            </Description>
          </PostCard>
        ))}
      </PostsContainer>
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
    allPodcastEpisodeCafeConTech(
      limit: 2
      sort: { order: DESC, fields: published_at }
    ) {
      nodes {
        podcastName
        id
        title
        slug
        remoteImage {
          childImageSharp {
            fluid(maxWidth: 60, quality: 70) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
    allPodcastEpisodeControlRemoto(
      limit: 2
      sort: { order: DESC, fields: published_at }
    ) {
      nodes {
        podcastName
        id
        title
        slug
        remoteImage {
          childImageSharp {
            fluid(maxWidth: 60, quality: 70) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
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
                fluid(maxWidth: 720) {
                  ...GatsbyImageSharpFluid
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
