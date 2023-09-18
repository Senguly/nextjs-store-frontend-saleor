import * as React from "react";
import { Helmet } from "react-helmet";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{
  children?: React.ReactNode;
  metaDescription?: any;
}> = ({ children, metaDescription }) => {
  return (
    <MetaConsumer>
      {({ title, image, type, url, custom }) => (
        <>
          <Helmet
            title={title}
            meta={[
              { name: "description", content: metaDescription },
              { property: "og:url", content: url },
              { property: "og:title", content: title },
              { property: "og:description", content: metaDescription },
              { property: "og:type", content: type },
              { property: "og:image", content: image },
              ...custom,
            ]}
          />
          {children}
        </>
      )}
    </MetaConsumer>
  );
};

export default Consumer;
