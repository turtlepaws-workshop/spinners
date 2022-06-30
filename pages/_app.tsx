import '../styles/styles.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>Spinners</title>
      <link rel="icon" href="./icon.png" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
