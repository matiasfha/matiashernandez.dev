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

const PostsSection = ({ posts }) => {
  return (
    <>
      <h1>Blog</h1>
      <PostsContainer>
        {posts.map(({ node: post }) => (
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
    </>
  );
};
export default PostsSection;
