import { useEffect } from 'react';

function useKeepAlive() {
  useEffect(() => {
    const apiBaseUrl =
      process.env.NEXT_PUBLIC_API_URL || 'https://serverdatabase.onrender.com/api/v1';
    const shouldKeepAlive = process.env.NEXT_PUBLIC_KEEP_ALIVE !== 'false';

    if (!shouldKeepAlive) {
      return undefined;
    }

    const interval = setInterval(() => {
      // Envie uma requisição simples para manter o servidor acordado.
      fetch(`${apiBaseUrl}/ping`)
        .then(res => res.json())
        .catch(err => console.error('Erro no keep-alive:', err));
    }, 45000); // a cada 45 segundos

    return () => clearInterval(interval);
  }, []);
}

export default useKeepAlive;
