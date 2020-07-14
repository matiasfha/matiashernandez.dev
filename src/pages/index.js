import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import Markdown from "react-markdown";
import { fonts } from "@/lib/typography";
import Layout from "@/components/Layout";
import Link from "@/components/Link";
import PodcastCard from "@/components/PodcastCard";
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
  background-image: url("https://static.wixstatic.com/media/6a09dadbfe8e4b2c844d14f0df73cb86.jpg/v1/fit/w_1362,h_908,al_c,q_80/file.jpg");
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

const EggheadContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  position: relative;
  padding-bottom: 56.25%;
  min-height: 500px;
  height: 500px;
  h3 {
    font-family: ${fonts.bold};
    color: #0443ac;
  }
`;

const EggheadColumn = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 30px 1fr;
  grid-gap: 10px;
  grid-template-areas:
    "title"
    "video";
  justify-content: space-between;
`;

const Eggheadtitle = styled.h3`
  font-family: Lato Black;
  color: #0443ac;
  grid-area: title;
`;

const EggheadVideo = styled.div`
  grid-area: video;
  position: relative;
`;
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
      <h1>Ultimos Videos en Egghead</h1>
      <EggheadContainer>
        <EggheadColumn>
          <Eggheadtitle>
            Crear un pugin de Gatbys para consumir datos de una API externa
          </Eggheadtitle>
          <EggheadVideo>
            <iframe
              src="https://egghead.io/lessons/gatsby-crear-un-plugin-de-gatsby-para-consumir-datos-de-una-api-externa/embed?pl=matias-blogs-posts-4783"
              css={css`
                width: 100%;
                height: 280px;
                top: 70px;
                left: 0px;
                border: none;
                position: absolute;
              `}
              allowFullScreen
            />
          </EggheadVideo>
        </EggheadColumn>
        <EggheadColumn>
          <Eggheadtitle>
            3 Formas de Actualizar un arreglo de objetos en Javaacript
          </Eggheadtitle>
          <EggheadVideo>
            <iframe
              src="https://egghead.io/lessons/javascript-3-formas-de-actualizar-un-arreglo-de-objetos-en-javascript/embed"
              css={css`
                width: 100%;
                height: 280px;
                top: 70px;
                left: 0px;
                border: none;
                position: absolute;
              `}
              allowFullScreen
            />
          </EggheadVideo>
        </EggheadColumn>
      </EggheadContainer>
      <h1>Blog</h1>
      <PostsContainer>
        {allMdx.edges.map(({ node: post }) => (
          <PostCard
            key={post.id}
            to={post.fields.slug}
            aria-label={`View ${post.frontmatter.title}`}
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
