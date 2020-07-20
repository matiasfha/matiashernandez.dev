import React from "react";
import styled from "@emotion/styled";
import { TwitterShareButton, LinkedinShareButton } from "react-share";
import { Twitter, LinkedIn } from "@/components/Footer";
import { fonts } from "@/lib/typography";
import { bpMaxSM } from "@/lib/breakpoints";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  grid-gap: 1rem;
  padding: 1rem 0 3rem;
  ${bpMaxSM} {
    grid-template-columns: 1fr;
  }
`;

const Line = styled.div`
  height: 1rem;
  border-top: 1px #ccc solid;
  align-self: center;
`;

const Text = styled.p`
  font-family: ${fonts.light};
  font-size: 1rem;
  text-align: right;
`;

const SharePost = ({ url, title }) => (
  <Container>
    <Line />
    <Text>
      Comparte en
      <TwitterShareButton url={url} title={title} via="@matiasfha">
        <Twitter />
      </TwitterShareButton>
      <LinkedinShareButton
        url={url}
        title={title}
        source="Matias Hernandez Site"
      >
        <LinkedIn />
      </LinkedinShareButton>
    </Text>
  </Container>
);

export default SharePost;
