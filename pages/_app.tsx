import Head from 'next/head'
import React from 'react'
import { Layout } from '../components'
import '../src/styles/globals.scss'
import { useRouter } from 'next/router';
import { store } from '../store'
import { Provider } from 'react-redux'
interface Props {
  Component: React.ElementType
  pageProps?: {}
}
function MyApp({ Component, pageProps }: Props) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>
          Demo
        </title>
        <link rel="shortcut icon" href={`${router.pathname}favicon-32x32.png`} />
        <link rel="icon" href={`${router.pathname}favicon-32x32.png`} />
        <meta
          name="description"
          content=""
          key="desc"
        />
        <meta property="og:title" content="Demo" />
        <meta property="og:url" content={`${router.pathname}`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${router.pathname}meta-image.jpg`} />
        <meta property="og:description" content="" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>

  )
}

export default MyApp