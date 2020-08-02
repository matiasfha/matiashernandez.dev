import React from "react";
import styled from "@emotion/styled";

const Iframe = styled.iframe`
  width: 100%;
  height: 100vh;
  border: 0;
  overflow: hidden;
`;

interface Props {
  id: string;
}
const Convertkit: React.FC<Props> = ({ id }: Props) => {
  return (
    <div data-uid={id} style={{ position: "relative", overflow: "hidden" }}>
      <Iframe title="converkit" src={`https://cafecontech.ck.page/${id}`} />
    </div>
  );
};

export default Convertkit;
