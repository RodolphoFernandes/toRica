import * as React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import { Zoom, GlobalStyles, responsiveFontSizes } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider } from 'react-query';

import themeOrigin from '../styles/theme';
import { queryClient } from '../services/queryClient';
import createEmotionCache from '../createEmotionCache';
// import { Footer } from '../components/Footer';
// import { SearchProvider } from '../context/SearchContext';
import { useRouter } from 'next/router';
import { Backdrop } from '../components/Backdrop';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  
  const theme = responsiveFontSizes(themeOrigin); 

  const router = useRouter();
  
  React.useEffect(() => {
    const handleStart = (url: string) => {
      setOpenBackdrop(true);
    }

    const handleStop = () => {
      setOpenBackdrop(false);
    }

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Zoom}
          preventDuplicate
        >
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <SearchProvider> */}
            <Backdrop open={openBackdrop}/>
            <Component {...pageProps} />
            
          {/* </SearchProvider> */}
          {/* <ReactQueryDevtools /> */}
          </SnackbarProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
