import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const ErrorFallbackContainer = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const ErrorFallbackImage = styled('img')(() => ({
  maxWidth: 300,
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Erro capturado pelo ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallbackContainer>
          <ErrorFallbackImage src="/images/background.gif" alt="Erro" />
          <h2>Algo deu errado 😓</h2>
          <p>Por favor, tente recarregar a página.</p>
        </ErrorFallbackContainer>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
