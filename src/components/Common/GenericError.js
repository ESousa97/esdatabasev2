// src/components/Common/GenericError.js

export default function GenericError({ statusCode, error }) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h1>Erro inesperado</h1>
        <p>Status: {statusCode || 'desconhecido'}</p>
        {error && <pre>{error.message}</pre>}
      </div>
    )
  }
  