import React from "react";
import styled from "@emotion/styled";
import { bpMaxSM } from "@/lib/breakpoints";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 3rem;
  position: relative;
  padding-bottom: 2rem;
  min-height: 800px;
  height: 800px;
  ${bpMaxSM} {
    grid-template-columns: 1fr;
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
  font-family: Lato Black;
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
          <Title href="https://egghead.io/lessons/gatsby-crear-un-plugin-de-gatsby-para-consumir-datos-de-una-api-externa">
            Crear un pugin de Gatbys para consumir datos de una API externa
          </Title>
          <Video
            url="https://egghead.io/lessons/javascript-3-formas-de-actualizar-un-arreglo-de-objetos-en-javascript/embed"
            title="Gatsby source plugin"
          />
        </Column>
        <Column>
          <Title href="https://egghead.io/lessons/javascript-3-formas-de-actualizar-un-arreglo-de-objetos-en-javascript">
            3 Formas de actualizar un arreglo de objetos en Javascript
          </Title>
          <Video
            url="https://egghead.io/lessons/javascript-3-formas-de-actualizar-un-arreglo-de-objetos-en-javascript/embed"
            title="Array update"
          />
        </Column>
      </Container>
    </>
  );
};

export default EggheadSection;
