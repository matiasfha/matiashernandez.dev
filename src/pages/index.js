import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Markdown from "react-markdown";
import { fonts } from "@/lib/typography";
import Layout from "@/components/Layout";
import Link from "@/components/Link";
import PodcastCard from "@/components/PodcastCard";
import EggheadSection from "@/components/EggheadSection";
import ControlRemotoLogo from "assets/ControLRemotoLogo.jpeg";
import ControlRemotoBG from "assets/ControlRemotoBG.png";
import CafeConTechLogo from "assets/CafeConTechLogo.jpeg";
import CafeConTechBG from "assets/CafeConTechBG.png";

const PodcastsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  padding-bottom: 2rem;
`;
const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 2rem 0;
`;

const PostCard = styled(Link)`
  position: relative;
  width: 100%;
  background: white;
  margin: 0 auto;
  flex-direction: column;
  display: flex;
  justify-content: center;
  text-decoration: none;
  background-image: url(${(props) => props.background});
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 350px;
`;

const PostOverlay = styled.div`
  background: rgba(0, 0, 0, 0.7);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const PostContentContainer = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1fr 1fr;
  justify-content: space-betwen;
`;

const PostTitle = styled.h3`
  margin-bottom: 0;
  font-size: 22px;
  font-family: ${fonts.light};
  color: white;
  text-decoration: none;
`;

const TimeToRead = styled.span`
  font-family: ${fonts.light};
  font-size: 12px;
  color: white;
`;

const Description = styled.div`
  width: 100%;
  font-family: ${fonts.regular};
  font-size: 14px;
  color: white;
  align-self: end;
  p {
    margin-bottom: 4px;
  }
`;

const PodcastSection = ({ cafeConTech, controlRemoto }) => (
  <>
    <h1>Podcasts</h1>
    <PodcastsContainer>
      <PodcastCard
        episodes={cafeConTech.nodes}
        title="Cafe con Tech"
        image={CafeConTechLogo}
        background={CafeConTechBG}
      />
      <PodcastCard
        episodes={controlRemoto.nodes}
        title="Control Remoto"
        image={ControlRemotoLogo}
        background={ControlRemotoBG}
      />
    </PodcastsContainer>
  </>
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
      <PodcastSection
        cafeConTech={allPodcastEpisodeCafeConTech}
        controlRemoto={allPodcastEpisodeControlRemoto}
      />
      <EggheadSection />
      <h1>Blog</h1>
      <PostsContainer>
        {allMdx.edges.map(({ node: post }) => (
          <PostCard
            key={post.id}
            to={post.fields.slug}
            aria-label={`View ${post.frontmatter.title}`}
            background={post.frontmatter.banner.childImageSharp.fluid.src}
          >
            <PostOverlay />
            <PostContentContainer>
              <div>
                <PostTitle>{post.frontmatter.title}</PostTitle>
                <TimeToRead>{post.fields.readingTime.text}</TimeToRead>
              </div>
              <Description>
                {post.frontmatter.description ? (
                  <Markdown>{post.frontmatter.description}</Markdown>
                ) : null}
              </Description>
            </PostContentContainer>
          </PostCard>
        ))}
      </PostsContainer>
      <Link
        to="/blog"
        aria-label="Visitar el Blog"
        css={css`
          text-decoration: none;
          font-family: ${fonts.regular};
          font-size: 1rem;
        `}
      >
        Ver todos los posts
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
        audio_url
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
        audio_url
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
          fields {
            readingTime {
              text
            }
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
            description
            banner {
              childImageSharp {
                fluid(maxWidth: 350) {
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
