import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { fonts } from "@/lib/typography";
import { bpMaxSM } from "@/lib/breakpoints";
import Layout from "@/components/Layout";
import Link from "@/components/Link";
import PodcastCard from "@/components/PodcastCard";
import EggheadSection from "@/components/EggheadSection";
import PostsSection from "@/components/PostsSection";
import ControlRemotoLogo from "assets/ControLRemotoLogo.jpeg";
import ControlRemotoBG from "assets/ControlRemotoBG.png";
import CafeConTechLogo from "assets/CafeConTechLogo.jpeg";
import CafeConTechBG from "assets/CafeConTechBG.png";

const PodcastsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  padding-bottom: 2rem;
  ${bpMaxSM} {
    grid-template-columns: 1fr;
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
    <Layout>
      <PodcastSection
        cafeConTech={allPodcastEpisodeCafeConTech}
        controlRemoto={allPodcastEpisodeControlRemoto}
      />
      <EggheadSection />
      <PostsSection posts={allMdx.edges} />
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
            fluid(maxWidth: 120, quality: 70) {
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
            fluid(maxWidth: 120, quality: 70) {
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    }
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { published: { eq: true } } }
      limit: 5
    ) {
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
