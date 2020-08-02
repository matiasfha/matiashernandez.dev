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
const Speakpipe: React.FC<Props> = ({ id }: Props) => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.speakpipe.com/widget/loader.js";
    script.async = true;
    script.charset = "utf-8";
    document.getElementsByTagName("body")[0].append(script);
    script.onerror = (e) => {
      console.error(e);
    };
  }, []);
  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Iframe
        src={`https://www.speakpipe.com/widget/inline/${id}`}
        width="100%"
        height="100%"
        frameBorder="0"
      />
    </div>
  );
};

export default Speakpipe;
