import React from "react";

import ColorModeProvider from "@docs/components/ColorModeProvider";
import { AutoLinkContext } from "@design/components/AutoLink";
import { Link } from "@docs/components/Router";

// import the global CSS
import "@design/theme/globals";

// Inject the Gatsby router link to auto links
const linkContext: AutoLinkContext = { link: Link };

/**
 * Custom site-wide root component.
 * See https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement
 */
const Root: React.FC = ({ children }) => (
  <ColorModeProvider>
    <AutoLinkContext.Provider value={linkContext}>
      {children}
    </AutoLinkContext.Provider>{" "}
  </ColorModeProvider>
);

export default Root;
