import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { Providers } from "app/redux/provider";

import React from "react";
import { Windmill } from "@roketid/windmill-react-ui";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  if (!process.browser) React.useLayoutEffect = React.useEffect;

  return (
    <Providers>
      <Windmill usePreferences={true}>
        <Component {...pageProps} />
      </Windmill>
    </Providers>
  );
}
export default MyApp;
