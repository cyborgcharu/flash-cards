import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>JavaScript Flashcards</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn JavaScript concepts with flashcards" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}