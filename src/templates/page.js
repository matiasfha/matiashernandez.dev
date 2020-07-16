import React from "react";
import Layout from "components/layout";

import Seo from "@/components/Seo";

function Page({ children, pageContext: { frontmatter } }) {
  return (
    <>
      <Seo frontmatter={frontmatter} />
      <Layout
        header={false}
        title={frontmatter.title}
        frontmatter={frontmatter}
      >
        {children}
      </Layout>
    </>
  );
}

export default Page;
