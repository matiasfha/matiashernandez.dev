import React from "react";
import styled from "@emotion/styled";
import { EggheadLesson } from "@pauliescanlon/gatsby-mdx-embed";
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

const EggheadSection = () => {
  return (
    <>
      <h1>Ultimos Videos en Egghead</h1>
      <Container>
        <Column>
          <Title href="https://egghead.io/lessons/egghead-personaliza-tu-perfil-en-github-con-el-nuevo-perfil-readme">
            Pesonaliza tu perfil en Github con el nuevo README
          </Title>
          <EggheadLesson lessonId="egghead-personaliza-tu-perfil-en-github-con-el-nuevo-perfil-readme" />
        </Column>
        <Column>
          <Title href="https://egghead.io/lessons/gatsby-optimizar-images-remotas-en-un-plugin-fuente-para-gatsby">
            Optimizar imágenes remotas en un plugin fuente para Gatsby
          </Title>
          <EggheadLesson lessonId="gatsby-optimizar-images-remotas-en-un-plugin-fuente-para-gatsby" />
        </Column>
      </Container>
    </>
  );
};

export default EggheadSection;
