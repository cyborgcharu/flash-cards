import Head from 'next/head'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>JavaScript Flashcards</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon"/>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/>
        <meta name="description" content="Learn JavaScript concepts with flashcards" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}