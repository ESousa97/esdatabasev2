import React from 'react';
import PropTypes from 'prop-types';
import '../src/styles/global.scss';
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

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
