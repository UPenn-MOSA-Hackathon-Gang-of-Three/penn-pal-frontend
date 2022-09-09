import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.
import { ChakraProvider, Box } from '@chakra-ui/react';
import Head from 'next/head';

import theme from 'utils/theme';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <title>Penn-Pal App | Mentor-Mentee Matching</title>
        <meta name='description' content='Mentee-Mentor Matching Service' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box as='header'></Box>

      <Box as='main'>
        <Component {...pageProps} />
      </Box>

      <Box as='footer'></Box>
    </ChakraProvider>
  );
}

export default MyApp;
