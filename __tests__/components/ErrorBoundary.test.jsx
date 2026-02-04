import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '../../src/styles/theme';
import ErrorBoundary from '../../src/components/Common/ErrorBoundary';

describe('ErrorBoundary', () => {
  // Suppress console.error for this test since we're testing error handling
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });
  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when there is no error', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <ErrorBoundary>
          <div data-testid="child">Child content</div>
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ThemeProvider theme={lightTheme}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </ThemeProvider>
    );

    expect(screen.getByText('Algo deu errado 😓')).toBeInTheDocument();
  });
});
