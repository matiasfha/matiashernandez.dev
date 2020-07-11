import React from "react";
import styled, { css } from "styled-components";
import Markdown from "react-markdown";
import Link from "components/Link";

export default function Message({
  illustration,
  title,
  body,
  note,
  fullscreen = false,
  articleTitle,
  articleSlug,
}) {
  return (
    <Center
      css={css`
        min-height: ${fullscreen ? "70vh" : "auto"};
      `}
    >
      <div>{illustration}</div>
      <h2>{title}</h2>
      {body && <Markdown>{body}</Markdown>}
      {note && (
        <div
          className={css`
            color: rgba(0, 0, 0, 0.7);
            transform: scale(0.85);
            color: black;
            font-family: Lato Regular;
            span:hover {
              opacity: 1;
              color: rgba(0, 0, 0, 1);
            }
          `}
        >
          <span>
            <Markdown>{note}</Markdown>
          </span>
        </div>
      )}
      {articleTitle && (
        <div>
          <Link to={`/${articleSlug}`}>{articleTitle}</Link>
        </div>
      )}
    </Center>
  );
}

export const Center = styled.div`
  width: 100vw;
  max-width: 100% !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  p {
    margin-top: 10px;
    max-width: 400px;
    line-height: 1.5;
    font-weight: 400;
    strong {
      font-weight: 600;
    }
  }
  h2 {
    font-size: 26px;
    font-weight: 400;
    margin-bottom: 0;
    margin-top: 25px;
  }
`;
