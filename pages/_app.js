import React from 'react';
import { CustomThemeProvider } from '../src/contexts/ThemeProvider';
import useKeepAlive from '../src/hooks/useKeepAlive';
import ErrorBoundary from '../src/components/Common/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  useKeepAlive();

  return (
    <CustomThemeProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </CustomThemeProvider>
  );
}

export default MyApp;
