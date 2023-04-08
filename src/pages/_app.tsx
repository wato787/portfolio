import "@/styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";

import { RecoilRoot } from "recoil";
import { theme } from "../styles/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Head>
            <title>Ohung</title>
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="../../public/icon.jpeg"
            />
          </Head>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}
