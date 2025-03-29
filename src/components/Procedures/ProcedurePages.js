// src/components/Procedures/ProcedurePages.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MainLayout from '../Layout/MainLayout';
import ProcedureDetails from './ProcedureDetails';

function ProcedurePages() {
  const { query } = useRouter();
  const { id } = query;
  const [procedure, setProcedure] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    // Alteração: utiliza a rota correta com parâmetro de rota
    axios.get(`https://serverdatabase.onrender.com/api/projects/${id}`)
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
