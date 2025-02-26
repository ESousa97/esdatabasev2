import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout'; // Atualizado para novo caminho
import ProcedureDetails from './ProcedureDetails'; // Se o arquivo ProcedureDetails.js estiver na mesma pasta

function ProcedurePages() {
  const { query } = useRouter();
  const { id } = query;
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios.get(`https://serverdatabase.vercel.app/api/procedure?id=${id}`)
      .then(response => {
        setProcedure(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar procedimento:', error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [id]);  

  if (loading) return <MainLayout><div>Carregando...</div></MainLayout>;
  if (error) return <MainLayout><div>Erro ao carregar procedimento</div></MainLayout>;
  if (!procedure) return null;

  return (
    <MainLayout>
      <ProcedureDetails procedure={procedure} />
    </MainLayout>
  );
}

export default ProcedurePages;
