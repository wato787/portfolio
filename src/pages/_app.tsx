import "@/styles/globals.css";

import { ChakraProvider} from '@chakra-ui/react';
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { theme } from '../styles/theme';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    const currentUrl = router.asPath;
    const existingTab = Array.from(window.parent.frames)
      .find(frame => frame.location.href === currentUrl);

    if (existingTab) {
      existingTab.focus();
    } else {
      window.open(currentUrl, '_blank');
    }
  }, [router]);
  
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
