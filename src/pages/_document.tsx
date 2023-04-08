import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <link rel="apple-touch-icon" sizes="180x180" href="../../public/icon.jpeg" />

        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital@1&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Klee+One:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
