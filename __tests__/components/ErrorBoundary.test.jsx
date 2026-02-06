import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { lightTheme } from '../../src/styles/theme';
import ErrorBoundary from '../../src/components/Common/ErrorBoundary';

// Wrapper component for tests
const TestWrapper = ({ children }) => <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;

TestWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

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
      <ErrorBoundary>
        <div data-testid="child">Child content</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Algo deu errado 😓')).toBeInTheDocument();
  });
});
