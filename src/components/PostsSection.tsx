import React from "react";
import styled from "@emotion/styled";
import { bpMaxSM } from "@/lib/breakpoints";
import Markdown from "react-markdown";
import { fonts } from "@/lib/typography";
import Link from "@/components/Link";

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 2rem 0;
  ${bpMaxSM} {
    grid-template-columns: 1fr;
  }
`;

interface PostCardProps {
  background: string;
}
const PostCard = styled.div<PostCardProps>`
  position: relative;
  width: 100%;
  background: white;
  margin: 0 auto;
  flex-direction: column;
  display: grid;
  grid-template-columns: 1fr;
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
  grid-template-rows: 120px 1fr;
  justify-content: space-between;
`;

const PostTitle = styled(Link)`
  margin-bottom: 0;
  font-size: 22px;
  font-family: ${fonts.light};
  color: white;
  text-decoration: none;
  display: block;
`;

const TimeToRead = styled.span`
  font-family: ${fonts.light};
  font-size: 12px;
  color: white;
`;

const Description = styled(Link)`
  width: 100%;
  font-family: ${fonts.regular};
  font-size: 12px;
  color: white;
  align-self: end;
  justify-self: end;
  p {
    margin-bottom: 4px;
    font-size: 14px;
  }
`;

const Tag = styled.div<{ value: string }>`
  display: block;
  font-size: 0.8rem;
  width: 50px;
  text-align: center;
  color: white;
  border-radius: 5px;
  ${(props) => {
    switch (props.value) {
      case "post":
        return `background: rgb(23,169,116)`;
      case "seed":
        return `background: rgb(4,67,172)`;
      case "notes":
        return `background: yellow`;
      case "idea":
        return `background: #ec2754`;
      default:
        return `background: transparent`;
    }
  }}
`;

const H1 = styled.h2`
  color: rgb(4, 67, 172);
  font-family: Phosphate;
  font-weight: bold;
  text-rendering: optimizeLegibility;
  font-size: 2rem;
`;

interface Post {
  id: string;
  fields: {
    slug: string;
    readingTime: {
      text: string;
    };
  };
  frontmatter: {
    title: string;
    tag: string;
    description: string;
    banner: {
      childImageSharp: {
        fluid: {
          src: string;
        };
      };
    };
  };
}
interface Props {
  posts: Array<{
    node: Post;
  }>;
}
const PostsSection: React.FC<Props> = ({ posts }: Props) => {
  return (
    <>
      <H1>My digital garden</H1>
      <p>
        Un digital garden/jardín digital es un espacio digital lleno de ideas
        interconectadas e información recolectada, curada y siempre en progreso
        durante el tiempo. Esto implica que dentro de este espacio existira
        contenido que aún no "florece" o incluso que se encuentra en esetado de
        semilla o germinación. Un conjunto de ideas que se mantienen en
        progreso. Estará enfocado en Javascript, React y desarrollo web en
        general.
      </p>
      <PostsContainer>
        {posts.map(({ node }: { node: Post }) => (
          <PostCard
            key={node.id}
            aria-label={`View ${node.frontmatter.title}`}
            background={node.frontmatter.banner.childImageSharp.fluid.src}
          >
            <PostOverlay />
            <PostContentContainer>
              <div>
                <PostTitle to={node.fields.slug} title={node.frontmatter.title}>
                  {node.frontmatter.title}
                </PostTitle>
                <TimeToRead>{node.fields.readingTime.text}</TimeToRead>
                <Tag value={node.frontmatter.tag.toLowerCase()}>
                  {node.frontmatter.tag}
                </Tag>
              </div>
              <Description to={node.fields.slug} title={node.frontmatter.title}>
                {node.frontmatter.description ? (
                  <Markdown>{node.frontmatter.description}</Markdown>
                ) : null}
              </Description>
            </PostContentContainer>
          </PostCard>
        ))}
      </PostsContainer>
    </>
  );
};
export default PostsSection;
