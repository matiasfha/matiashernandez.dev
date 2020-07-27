import React from "react";
import styled from "@emotion/styled";
import { bpMaxSM } from "@/lib/breakpoints";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  position: relative;
  padding-bottom: 2rem;
  min-height: 400px;
  height: 400px;
  ${bpMaxSM} {
    grid-template-columns: 1fr;
    min-height: 700px;
    height: 700px;
  }
`;

const Column = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 30px 1fr;
  grid-gap: 10px;
  grid-template-areas:
    "title"
    "video";
  justify-content: space-between;
`;

const Title = styled.a`
  font-family: Lato Bold;
  color: #333;
  grid-area: title;
  font-size: 1.3rem;
  text-decoration: none;
`;

const VideoContainer = styled.div`
  grid-area: video;
  position: relative;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 280px;
  top: 70px;
  left: 0px;
  border: none;
  position: absolute;
  ${bpMaxSM} {
    height: 220px;
  }
`;

const EggheadSection = () => {
  const Video = ({ url, title }) => {
    return (
      <VideoContainer>
        <Iframe src={url} allowFullScreen title={title} />
      </VideoContainer>
    );
  };
  return (
    <>
      <h1>Ultimos Videos en Egghead</h1>
      <Container>
        <Column>
          <Title href="https://egghead.io/lessons/egghead-personaliza-tu-perfil-en-github-con-el-nuevo-perfil-readme">
            Pesonaliza tu perfil en Github con el nuevo README
          </Title>
          <Video
            url="https://egghead.io/lessons/egghead-personaliza-tu-perfil-en-github-con-el-nuevo-perfil-readme/embed"
            title="Gatsby source plugin"
          />
        </Column>
        <Column>
          <Title href="https://egghead.io/lessons/gatsby-optimizar-images-remotas-en-un-plugin-fuente-para-gatsby">
            Optimizar imágenes remotas en un plugin fuente para Gatsby
          </Title>
          <Video
            url="https://egghead.io/lessons/gatsby-optimizar-images-remotas-en-un-plugin-fuente-para-gatsby/embed"
            title="Array update"
          />
        </Column>
      </Container>
    </>
  );
};

export default EggheadSection;
