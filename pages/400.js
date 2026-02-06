import StatusErrorPage from '../src/components/Common/StatusErrorPage';
import HomeIcon from '@mui/icons-material/Home';
import { useRouter } from 'next/router';
import errorAnimation from '../src/animations/erro-400.json';

export default function Custom400() {
  const router = useRouter();
  return (
    <StatusErrorPage
      animationData={errorAnimation}
      title="Erro 400 - Requisição inválida"
      description={
        'A solicitação não pôde ser entendida pelo servidor devido a uma sintaxe malformada, parâmetros inválidos ou dados incorretos.'
      }
      actionLabel="Voltar ao início"
      actionIcon={HomeIcon}
      onAction={() => router.push('/components')}
    />
  );
}
