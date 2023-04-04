import "@/styles/globals.css";

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {

  
  return (
    <>
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}
