import React from 'react';
import { CustomThemeProvider } from '../src/contexts/ThemeProvider';

function MyApp({ Component, pageProps }) {
  return (
    <CustomThemeProvider>
      <Component {...pageProps} />
    </CustomThemeProvider>
  );
}

export default MyApp;
