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
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />

            <title>Ohung</title>
          </Head>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}
