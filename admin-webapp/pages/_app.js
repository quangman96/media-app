import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../components/theme";
import createEmotionCache from "../components/createEmotionCache";
import Layout from "../components/layout";
import '../styles/globals.css'
import { useRouter } from "next/router";
import { AuthUserProvider } from "../utils/AuthUserProvider";

// Client-side cache shared for the whole session
// of the user in the browser.

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const router = useRouter();
  return (
    <CacheProvider value={emotionCache}>
      {/* <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head> */}
                  <Head>
                <title>Hello</title>

                {/* eslint-disable-next-line @next/next/no-css-tags */}
                {/* <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" /> */}
            </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, 
                consistent, and simple baseline to
                build upon. */}

        <CssBaseline />
        {router.route === "/" ? <Component {...pageProps} /> : <Layout><Component {...pageProps} /></Layout>}
        {/* {router.route === "/" ? <AuthUserProvider><Component {...pageProps} /></AuthUserProvider> : <Layout><AuthUserProvider><Component {...pageProps} /></AuthUserProvider></Layout>} */}
      </ThemeProvider>
    </CacheProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
};
