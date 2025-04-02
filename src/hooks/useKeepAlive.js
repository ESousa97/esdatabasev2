import { useEffect } from 'react';

function useKeepAlive() {
  useEffect(() => {
    const interval = setInterval(() => {
      // Envie uma requisição simples para manter o servidor acordado.
      fetch('https://serverdatabase.onrender.com/api/v1/ping')
        .then(res => res.json())
        .catch(err => console.error('Erro no keep-alive:', err));
    }, 45000); // a cada 45 segundos

    return () => clearInterval(interval);
  }, []);
}

export default useKeepAlive;
