import React from 'react';
import { CustomThemeProvider } from '../src/contexts/ThemeProvider';
import useKeepAlive from '../src/hooks/useKeepAlive';

function MyApp({ Component, pageProps }) {
  useKeepAlive();

  return (
    <CustomThemeProvider>
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}

export default MyApp;
