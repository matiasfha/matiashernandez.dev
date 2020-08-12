import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import styled from "@emotion/styled";
import { EggheadLesson } from "@pauliescanlon/gatsby-mdx-embed";
import { bpMaxSM } from "@/lib/breakpoints";

const H1 = styled.h2`
  color: rgb(4, 67, 172);
  font-family: Phosphate;
  font-weight: bold;
  text-rendering: optimizeLegibility;
  font-size: 2rem;
`;

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

const getLesssonId = (url: string) => {
  console.log({ url });
  const lessonId = new URL(url).pathname.replace(/\/lessons\//, "");
  return lessonId;
};

interface Node {
  node: {
    id: string;
    title: string;
    link: string;
  };
}
const EggheadSection = () => {
  const {
    allFeedEggheadLessons: { edges },
  } = useStaticQuery(graphql`
    {
      allFeedEggheadLessons(
        sort: { order: DESC, fields: isoDate }
        filter: { pubDate: { ne: "" } }
        limit: 2
      ) {
        edges {
          node {
            id
            title
            link
          }
        }
      }
    }
  `);
  return (
    <>
      <H1>Últimos Videos en Egghead</H1>
      <Container>
        {edges.map((node: Node) => {
          return (
            <Column key={node.node.id}>
              <Title
                href={`${node.node.link}?af=4cexzz`}
                title={node.node.title}
              >
                {node.node.title}
              </Title>
              <EggheadLesson lessonId={getLesssonId(node.node.link)} />
            </Column>
          );
        })}
      </Container>
    </>
  );
};

export default EggheadSection;
