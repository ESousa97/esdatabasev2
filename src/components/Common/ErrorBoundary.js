import React from 'react';

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
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <img
            src="/images/background.gif"
            alt="Erro"
            style={{ maxWidth: 300 }}
          />
          <h2>Algo deu errado 😓</h2>
          <p>Por favor, tente recarregar a página.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
