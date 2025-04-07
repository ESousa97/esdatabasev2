// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt" suppressHydrationWarning>
        <Head />
        <body>
          {/* Script inline para definir o tema antecipadamente */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  const persistedPreference = window.localStorage.getItem('color-mode');
                  const mql = window.matchMedia('(prefers-color-scheme: dark)');
                  const colorMode = persistedPreference || (mql.matches ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', colorMode);
                  // Se desejar, você pode definir também a classe
                  document.documentElement.className = colorMode;
                })();
              `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
