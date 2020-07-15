import React from "react";
import styled from "@emotion/styled";
import Img from "gatsby-image";
import { fonts } from "@/lib/typography";
import Link from "@/components/Link";

const PodcastColumn = styled.div`
  background: white;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 3px 0px;
  border-radius: 5px;
  h2 {
    color: #333;
    font-family: ${fonts.titles};
  }
  h4 {
    color: #333;
    font-family: ${fonts.bold};
  }
`;

const PodcastEpisode = styled.a`
  position: relative;
  text-decoration: none;
  display: grid;
  grid-template-columns: 1fr 150px;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 0 2rem;
  border-bottom: 1px solid #dfdfdf;
  &:last-child {
    border-bottom: none;
  }
  h4 {
    flex: 0.8;
    font-family: ${fonts.regular};
    font-weight: 400;
    color: rgb(45, 93, 185);
  }
  & > div {
    justify-self: center;
  }
`;

const PodcastImg = styled(Img)`
  border-radius: 60px;
  width: 130%;
`;

const PodcastHeader = styled.div<{ background: string }>`
  width: 100%;
  min-height: 80px;
  background: #35a777;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: ${(props) => `url(${props.background})`};
`;
const PodcastContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-areas:
    "header"
    "content";
`;

const PodcastInfo = styled.div`
  grid-area: header;
  display: grid;
  grid-template-columns: 140px 1fr;
  grid-gap: 20px;
  img {
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.75);
    width: 100%;
    align-self: start;
  }
  h2 {
    text-align: left;
  }
  padding: 0 30px;
  margin-top: -3rem;
  align-items: center;
`;

const PodcastEpisodes = styled.div`
  grid-area: content;
  display: grid;
  grid-gap: 10px;
  grid-template-rows: repeat(minmax(100px, 1fr));
`;

type PodcastCardProps = {
  episodes: Array<{
    id: string;
    slug: string;
    podcastName: string;
    title: string;
    remoteImage: {
      childImageSharp: {
        fluid: any;
      };
    };
  }>;
  title: string;
  image: string;
  background: sring;
};
const PodcastCard: React.FC<PodcastCardProps> = ({
  episodes,
  title,
  image,
  background,
}) => (
  <PodcastColumn>
    <PodcastHeader background={background} />
    <PodcastContent>
      <PodcastInfo>
        <img src={image} alt={title} />
        <h2>{title}</h2>
      </PodcastInfo>
      <PodcastEpisodes>
        {episodes.map((item) => (
          <PodcastEpisode
            key={item.id}
            href={item.audio_url.split(".").slice(0, -1).join(".")}
          >
            <h4>{item.title}</h4>
            <PodcastImg fluid={item.remoteImage.childImageSharp.fluid} />
          </PodcastEpisode>
        ))}
      </PodcastEpisodes>
    </PodcastContent>
  </PodcastColumn>
);

export default PodcastCard;
